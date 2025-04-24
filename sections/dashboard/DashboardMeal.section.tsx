"use client";
import { Utensils } from "lucide-react";
import { useDashboardData } from "./Dashboard.action";
import { WEEKLY_PLAN_MEAL_TIMES_VALUES } from "@/helper/constants/weekly_plan.constant";
import { capitalizeFirstLetter } from "@/helper/function";
import { MenuItem } from "@/components/meal-item/MenuItem.component";

export const DashboardMealSection: React.FC = () => {
  const { mealPlan } = useDashboardData();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Today's Meal
      </h2>
      <div className="mt-2">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          {WEEKLY_PLAN_MEAL_TIMES_VALUES.map((mealType) => {
            return (
              <div
                key={mealType}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold capitalize">
                    {capitalizeFirstLetter(mealType)}
                  </h2>
                  <Utensils className="h-5 w-5 text-primary" />
                </div>

                {mealPlan?.[mealType]?.items &&
                mealPlan?.[mealType]?.items?.length > 0 ? (
                  <div className="space-y-3">
                    {mealPlan[mealType].items.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MenuItem item={item} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Utensils className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No meals planned for {mealType.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
