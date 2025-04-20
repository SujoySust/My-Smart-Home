import dbConnect from "@/lib/mongoose";
import { MonthlyExpense } from "@/models/expense";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { year, month, expense } = body;

    let monthlyExpense = await MonthlyExpense.findOne({ year, month });

    if (!monthlyExpense) {
      monthlyExpense = new MonthlyExpense({
        year,
        month,
        expenses: [expense],
        totalAmount: expense.amount,
      });
    } else {
      monthlyExpense.expenses.push(expense);
      monthlyExpense.totalAmount += expense.amount;
    }

    await monthlyExpense.save();
    return NextResponse.json(monthlyExpense);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add expense" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    const query: any = {};
    if (year) query.year = parseInt(year);
    if (month) query.month = parseInt(month);

    const expenses = await MonthlyExpense.find(query).sort({
      year: -1,
      month: -1,
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
