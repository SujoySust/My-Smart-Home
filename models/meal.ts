import mongoose, { Document, Schema } from "mongoose";

// Interface for MealItem
export interface IMealItem extends Document {
  name: string;
  description?: string;
  quantity?: number;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for MealTime
export interface IMealTime extends Document {
  items: IMealItem[];
}

// Interface for DayMeals
export interface IDayMeals extends Document {
  breakfast?: IMealTime;
  lunch?: IMealTime;
  dinner?: IMealTime;
  snacks?: IMealTime;
}

// Interface for WeeklyMealPlan
export interface IWeeklyMealPlan extends Document {
  sunday?: IDayMeals;
  monday?: IDayMeals;
  tuesday?: IDayMeals;
  wednesday?: IDayMeals;
  thursday?: IDayMeals;
  friday?: IDayMeals;
  saturday?: IDayMeals;
  createdAt: Date;
  updatedAt: Date;
}

const MealItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    quantity: Number,
    unit: String,
  },
  { timestamps: true }
);

const MealTimeSchema = new Schema({
  items: [MealItemSchema],
});

const DayMealsSchema = new Schema({
  breakfast: MealTimeSchema,
  lunch: MealTimeSchema,
  dinner: MealTimeSchema,
  snacks: MealTimeSchema,
});

const WeeklyMealPlanSchema = new Schema(
  {
    sunday: DayMealsSchema,
    monday: DayMealsSchema,
    tuesday: DayMealsSchema,
    wednesday: DayMealsSchema,
    thursday: DayMealsSchema,
    friday: DayMealsSchema,
    saturday: DayMealsSchema,
  },
  { timestamps: true }
);

// Check if the model is already defined to prevent OverwriteModelError
export const WeeklyMealPlan =
  mongoose.models.WeeklyMealPlan ||
  mongoose.model<IWeeklyMealPlan>("WeeklyMealPlan", WeeklyMealPlanSchema);
