import dbConnect from "@/lib/mongoose";
import { IExpense, MonthlyExpense } from "@/models/expense";
import { NextResponse } from "next/server";

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

    const expenses = await MonthlyExpense.aggregate([
      {
        $unwind: "$expenses",
      },
      {
        $match: {
          "expenses.date": {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: {
          "expenses.createdAt": -1,
        },
      },
      {
        $group: {
          _id: null,
          expenses: { $push: "$expenses" },
          totalAmount: { $sum: "$expenses.amount" },
        },
      },
    ]);

    if (expenses.length === 0) {
      return NextResponse.json({
        expenses: [],
        totalAmount: 0,
      });
    }

    return NextResponse.json({
      expenses: expenses[0].expenses,
      totalAmount: expenses[0].totalAmount,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

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
      });
    } else {
      monthlyExpense.expenses.push(expense);
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

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { year, month, expenseId } = body;

    const monthlyExpense = await MonthlyExpense.findOne({ year, month });

    if (!monthlyExpense) {
      return NextResponse.json(
        { error: "Monthly expense not found" },
        { status: 404 }
      );
    }

    const expenseIndex = monthlyExpense.expenses.findIndex(
      (expense: IExpense) => expense._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    monthlyExpense.expenses.splice(expenseIndex, 1);

    await monthlyExpense.save();
    return NextResponse.json(monthlyExpense);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete expense" },
      { status: 500 }
    );
  }
}
