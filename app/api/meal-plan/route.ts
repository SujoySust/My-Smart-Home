import dbConnect from "@/lib/mongoose";
import { WeeklyMealPlan } from "@/models/meal";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { day, mealTime, item } = await request.json();
    await dbConnect();

    // Create the update path
    const updatePath = `${day}.${mealTime}.items`;

    // Find the current week's plan or create a new one
    let mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      mealPlan = new WeeklyMealPlan({});
    }

    // Push the new item to the specified day and meal time
    mealPlan.set(updatePath, [...(mealPlan.get(updatePath) || []), item]);

    await mealPlan.save();

    return NextResponse.json({
      message: "Meal item added successfully",
      data: item,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add meal item" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get URL search params
    const { searchParams } = new URL(request.url);
    const day = searchParams.get("day");
    const mealTime = searchParams.get("mealTime");

    const mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      return NextResponse.json({ data: {} });
    }

    // If day is specified, return only that day's meals
    if (day) {
      const dayMeals = mealPlan[day.toLowerCase()] || {};

      // If mealTime is specified, return only that meal time
      if (mealTime) {
        return NextResponse.json({
          data: {
            [day]: {
              [mealTime]: dayMeals[mealTime] || {},
            },
          },
        });
      }

      // Return all meal times for the specified day
      return NextResponse.json({
        data: {
          [day]: dayMeals,
        },
      });
    }

    // Return full weekly meal plan if no filters
    return NextResponse.json({
      data: {
        sunday: mealPlan.sunday || {},
        monday: mealPlan.monday || {},
        tuesday: mealPlan.tuesday || {},
        wednesday: mealPlan.wednesday || {},
        thursday: mealPlan.thursday || {},
        friday: mealPlan.friday || {},
        saturday: mealPlan.saturday || {},
      },
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch meal plan" },
      { status: 500 }
    );
  }
}

// PUT endpoint to update a specific meal item
export async function PUT(request: Request) {
  try {
    const { day, mealTime, item } = await request.json();

    const normalizedDay = day.toLowerCase();
    const normalizedMealTime = mealTime.toLowerCase();

    const validDays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const validMealTimes = ["breakfast", "lunch", "dinner", "snacks"];

    if (
      !validDays.includes(normalizedDay) ||
      !validMealTimes.includes(normalizedMealTime) ||
      !item?._id
    ) {
      return NextResponse.json(
        { error: "Invalid day, meal time or meal item provided" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create the path for the items array
    const itemsPath = `${normalizedDay}.${normalizedMealTime}.items`;

    const mealPlan = await WeeklyMealPlan.findOne().sort({ createdAt: -1 });

    if (!mealPlan) {
      return NextResponse.json(
        { error: "Meal plan not found" },
        { status: 404 }
      );
    }

    const dbItems = mealPlan.get(itemsPath) || [];
    const itemIndex = dbItems.findIndex(
      (dbItem: any) => dbItem._id.toString() === item._id
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Meal item not found" },
        { status: 404 }
      );
    }

    dbItems[itemIndex] = { ...dbItems[itemIndex], ...item };
    mealPlan.set(itemsPath, dbItems);
    mealPlan.set("updatedAt", new Date());
    await mealPlan.save();

    return NextResponse.json({
      message: "Meal item updated successfully",
      data: item,
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update meal item" },
      { status: 500 }
    );
  }
}
