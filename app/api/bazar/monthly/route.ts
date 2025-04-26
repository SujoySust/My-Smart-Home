import dbConnect from "@/lib/mongoose";
import { Bazar } from "@/models/bazar";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    const monthlyBazar = await Bazar.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          year: Number(year),
          month: Number(month),
        },
      },
      {
        $group: {
          _id: {
            week: {
              $ceil: {
                $divide: [{ $dayOfMonth: "$items.date" }, 7],
              },
            },
          },
          items: { $push: "$items" },
        },
      },
      {
        $project: {
          _id: 0,
          week: {
            $concat: ["Week ", { $toString: "$_id.week" }],
          },
          items: 1,
        },
      },
      {
        $sort: { week: 1 },
      },
    ]);

    return NextResponse.json({
      monthlyBazar: monthlyBazar.map((week) => ({
        week: week.week,
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
