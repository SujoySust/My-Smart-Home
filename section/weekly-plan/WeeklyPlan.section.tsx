"use client";

import { MenuItem } from "@/components/meal-item/MenuItem.component";
import MenuCreateOrEditForm from "@/components/menu/MenuCreateOrEditForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  WEEKLY_PLAN_DAYS,
  WEEKLY_PLAN_DAYS_VALUES,
  WEEKLY_PLAN_MEAL_TIMES,
  WEEKLY_PLAN_MEAL_TIMES_VALUES,
} from "@/helper/constants/weekly_plan.constant";
import { capitalizeFirstLetter } from "@/helper/function";
import { Pencil, Trash2, Utensils } from "lucide-react";
import React, { useRef } from "react";
import { useWeeklyMealPlanAction } from "./WeeklyPlan.action";

export const WeeklyPlanSection: React.FC = () => {
  const {
    weekDays,
    mealTimes,
    mealPlan,
    deleteMealItem,
    selectedDay,
    setSelectedDay,
    selectedMealTime,
    setSelectedMealTime,
  } = useWeeklyMealPlanAction();

  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Weekly Plan
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            className="w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2"
            defaultValue={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value as WEEKLY_PLAN_DAYS)}
          >
            <option value="">All Days</option>
            {WEEKLY_PLAN_DAYS_VALUES.map((day, index) => (
              <option key={index} value={day}>
                {capitalizeFirstLetter(day)}
              </option>
            ))}
          </select>

          <select
            className="w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2"
            defaultValue=""
            onChange={(e) =>
              setSelectedMealTime(e.target.value as WEEKLY_PLAN_MEAL_TIMES)
            }
          >
            <option value="">All Meal Times</option>
            {WEEKLY_PLAN_MEAL_TIMES_VALUES.map((time, index) => (
              <option key={index} value={time}>
                {capitalizeFirstLetter(time)}
              </option>
            ))}
          </select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">+ Add Meal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95%] p-4 sm:p-6 h-[90vh] sm:h-auto overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>
                  Fill in the details for this meal.
                </DialogDescription>
              </DialogHeader>
              <DialogClose ref={closeRef} />
              <MenuCreateOrEditForm
                day={selectedDay ?? undefined}
                mealTime={selectedMealTime ?? undefined}
                closeRef={closeRef}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {weekDays.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {capitalizeFirstLetter(day)}
            </h2>
          </div>
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {mealTimes.map((mealTime, mealIndex) => (
                <div
                  key={mealIndex}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <Utensils className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {capitalizeFirstLetter(mealTime)}
                    </h3>
                  </div>

                  <div>
                    {mealPlan?.[day]?.[mealTime]?.items &&
                    mealPlan?.[day]?.[mealTime]?.items?.length > 0 ? (
                      <div className="space-y-3">
                        {mealPlan[day][mealTime].items.map(
                          (item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <MenuItem
                                item={item}
                                deleteMealItem={async () => {
                                  await deleteMealItem({
                                    day,
                                    mealTime,
                                    itemId: item._id as string,
                                  });
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Utensils className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No meals planned for {mealTime.toLowerCase()} yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
