import dbConnect from "@/lib/mongoose";
import { IExpense, MonthlyExpense } from "@/models/expense";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || !month) {
      return NextResponse.json(
        { error: "Year and month are required" },
        { status: 400 }
      );
    }

    const monthlyExpense = await MonthlyExpense.findOne({
      year: parseInt(year),
      month: parseInt(month),
    });

    if (!monthlyExpense) {
      return NextResponse.json({
        expenses: [],
        totalAmount: 0,
      });
    }

    // Calculate total amount
    const totalAmount = monthlyExpense.expenses.reduce(
      (sum: number, expense: IExpense) => {
        return sum + expense.amount;
      },
      0
    );

    return NextResponse.json({
      expenses: monthlyExpense.expenses,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("Error fetching monthly expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch monthly expenses" },
      { status: 500 }
    );
  }
}
