import dbConnect from "@/lib/mongoose";
import { Bazar } from "@/models/bazar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const monthlyBazar = await Bazar.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.date": {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            week: {
              $floor: {
                $divide: [
                  { $subtract: ["$items.date", startOfMonth] },
                  1000 * 60 * 60 * 24 * 7,
                ],
              },
            },
          },
          items: { $push: "$items" },
          startDate: { $min: "$items.date" },
          endDate: { $max: "$items.date" },
        },
      },
      {
        $sort: { "_id.week": 1 },
      },
      {
        $project: {
          _id: 0,
          weekNumber: "$_id.week",
          items: 1,
          startDate: 1,
          endDate: 1,
        },
      },
    ]);

    return NextResponse.json({
      monthlyBazar: monthlyBazar.map((week) => ({
        weekNumber: week.weekNumber + 1,
        startDate: week.startDate,
        endDate: week.endDate,
        items: week.items,
      })),
    });
  } catch (error) {
    console.error("Error fetching monthly bazar:", error);
    return NextResponse.json(
      { error: "Failed to fetch monthly bazar" },
      { status: 500 }
    );
  }
}
