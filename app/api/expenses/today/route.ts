import dbConnect from "@/lib/mongoose";
import { MonthlyExpense } from "@/models/expense";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    console.log("startOfToday", startOfToday);
    console.log("endOfToday", endOfToday);
    // Find expenses for today
    const todayExpenses = await MonthlyExpense.aggregate([
      {
        $unwind: "$expenses",
      },
      //   {
      //     $match: {
      //       "expenses.date": {
      //         $gte: startOfToday,
      //         $lte: endOfToday,
      //       },
      //     },
      //   },
      {
        $sort: {
          "expenses.createdAt": -1,
        },
      },
      {
        $group: {
          _id: null,
          expenses: { $push: "$expenses" },
        },
      },
    ]);

    // If no expenses found, return empty array and 0 total
    if (todayExpenses.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(todayExpenses[0].expenses);
  } catch (error) {
    console.error("Error fetching today's expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's expenses" },
      { status: 500 }
    );
  }
}
