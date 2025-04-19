export type MealItem = {
  _id?: string;
  name: string;
  description?: string;
  ingredients?: string[];
  quantity?: number;
  unit?: string;
};

export type MealTime = {
  items: MealItem[];
};

export type DayMeals = {
  breakfast?: MealTime;
  lunch?: MealTime;
  dinner?: MealTime;
  snacks?: MealTime;
};

export type WeeklyMealPlan = {
  sunday?: DayMeals;
  monday?: DayMeals;
  tuesday?: DayMeals;
  wednesday?: DayMeals;
  thursday?: DayMeals;
  friday?: DayMeals;
  saturday?: DayMeals;
};
