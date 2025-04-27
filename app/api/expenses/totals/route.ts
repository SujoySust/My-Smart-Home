import dbConnect from "@/lib/mongoose";
import { MonthlyExpense } from "@/models/expense";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const today = searchParams.get("today");

    if (!today) {
      return NextResponse.json(
        { error: "Today date is required" },
        { status: 400 }
      );
    }

    const date = startOfDay(new Date(today));
    const week = startOfWeek(date);
    const month = startOfMonth(date);

    const [dailyTotal, weeklyTotal, monthlyTotal] = await Promise.all([
      // Daily total
      MonthlyExpense.aggregate([
        { $unwind: "$expenses" },
        {
          $match: {
            "expenses.date": { $gte: date },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$expenses.amount" },
          },
        },
      ]),
      // Weekly total
      MonthlyExpense.aggregate([
        { $unwind: "$expenses" },
        {
          $match: {
            "expenses.date": { $gte: week },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$expenses.amount" },
          },
        },
      ]),
      // Monthly total
      MonthlyExpense.aggregate([
        { $unwind: "$expenses" },
        {
          $match: {
            "expenses.date": { $gte: month },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$expenses.amount" },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      daily: dailyTotal[0]?.total || 0,
      weekly: weeklyTotal[0]?.total || 0,
      monthly: monthlyTotal[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching expense totals:", error);
    return NextResponse.json(
      { error: "Failed to fetch expense totals" },
      { status: 500 }
    );
  }
}
