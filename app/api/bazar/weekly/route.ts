import dbConnect from "@/lib/mongoose";
import { Bazar } from "@/models/bazar";
import { NextResponse } from "next/server";
import { BAZAR_STATUS } from "../constants";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 }
      );
    }

    const weeklyBazar = await Bazar.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.date": {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          "items.status": BAZAR_STATUS.COMPLETED,
        },
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$items.date" },
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$items.date" },
            },
          },
          items: { $push: "$items" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          day: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.dayOfWeek", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id.dayOfWeek", 2] }, then: "Monday" },
                { case: { $eq: ["$_id.dayOfWeek", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id.dayOfWeek", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id.dayOfWeek", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id.dayOfWeek", 6] }, then: "Friday" },
                { case: { $eq: ["$_id.dayOfWeek", 7] }, then: "Saturday" },
              ],
            },
          },
          items: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return NextResponse.json({
      weeklyBazar,
    });
  } catch (error) {
    console.error("Error fetching weekly bazar:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly bazar" },
      { status: 500 }
    );
  }
}
