import dbConnect from "@/lib/mongoose";
import { Bazar } from "@/models/bazar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyBazar = await Bazar.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.date": {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$items.date" },
          },
          items: { $push: "$items" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return NextResponse.json({
      weeklyBazar: weeklyBazar.map((day) => ({
        date: day._id,
        items: day.items,
      })),
    });
  } catch (error) {
    console.error("Error fetching weekly bazar:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly bazar" },
      { status: 500 }
    );
  }
}
