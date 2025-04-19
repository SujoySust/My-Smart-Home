import dbConnect from "@/lib/mongoose";
import { WeeklyMealPlan } from "@/models/meal";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { day: string } }
) {
  try {
    await dbConnect();

    const { day } = params;

    const mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      return NextResponse.json({ data: [] });
    }

    const today = mealPlan.get(`${day}`);

    return NextResponse.json({
      data: today,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch meal items" },
      { status: 500 }
    );
  }
}
