"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Utensils } from "lucide-react";
import { useDashboardData } from "./Dashboard.action";
import { WEEKLY_PLAN_MEAL_TIMES_VALUES } from "@/helper/constants/weekly_plan.constant";
import { capitalizeFirstLetter } from "@/helper/function";
import { MenuItem } from "@/components/meal-item/MenuItem.component";

export const DashboardSection: React.FC = () => {
  const { mealPlan } = useDashboardData();
  return (
    <div className="container mx-auto px-4 py-6 space-y-6 sm:space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Your meals for {format(new Date(), "EEEE, MMMM do")}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
        {WEEKLY_PLAN_MEAL_TIMES_VALUES.map((mealType) => {
          return (
            <Card key={mealType} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base sm:text-lg font-medium capitalize">
                  {capitalizeFirstLetter(mealType)}
                </CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {mealPlan?.[mealType]?.items &&
                mealPlan?.[mealType]?.items?.length > 0 ? (
                  mealPlan?.[mealType]?.items?.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-md p-3 sm:p-4 shadow-sm mb-3 sm:mb-4"
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="space-y-1 sm:space-y-2">
                          <MenuItem item={item} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground text-center py-4">
                    No meal planned for {mealType}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
