import dbConnect from "@/lib/mongoose";
import { MonthlyExpense } from "@/models/expense";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [dailyTotal, weeklyTotal, monthlyTotal] = await Promise.all([
      // Daily total
      MonthlyExpense.aggregate([
        { $unwind: "$expenses" },
        {
          $match: {
            "expenses.date": { $gte: startOfDay },
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
            "expenses.date": { $gte: startOfWeek },
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
            "expenses.date": { $gte: startOfMonth },
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
