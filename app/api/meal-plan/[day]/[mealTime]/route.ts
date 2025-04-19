import dbConnect from "@/lib/mongoose";
import { WeeklyMealPlan } from "@/models/meal";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { day: string; mealTime: string } }
) {
  try {
    await dbConnect();

    const { day, mealTime } = params;

    const mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      return NextResponse.json({ data: [] });
    }

    const items = mealPlan.get(`${day}.${mealTime}.items`) || [];

    return NextResponse.json({
      data: items,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch meal items" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { day: string; mealTime: string } }
) {
  try {
    await dbConnect();

    const { day, mealTime } = params;
    const { itemId } = await request.json();
    const updatePath = `${day}.${mealTime}.items`;

    const mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      return NextResponse.json(
        { error: "Meal plan not found" },
        { status: 404 }
      );
    }

    const items = mealPlan.get(updatePath) || [];
    const filteredItems = items.filter(
      (item: any) => item._id.toString() !== itemId
    );

    mealPlan.set(updatePath, filteredItems);
    await mealPlan.save();

    return NextResponse.json({
      message: "Meal item deleted successfully",
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete meal item" },
      { status: 500 }
    );
  }
}
