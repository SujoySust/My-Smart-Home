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
            defaultValue=""
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
        <Card key={dayIndex} className="mb-6">
          <CardHeader>
            <CardTitle>{capitalizeFirstLetter(day)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mealTimes.map((mealTime, mealIndex) => (
                <div key={mealIndex} className="w-full">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base sm:text-lg font-medium">
                        {capitalizeFirstLetter(mealTime)}
                      </CardTitle>
                      <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {mealPlan?.[day]?.[mealTime]?.items &&
                      mealPlan?.[day]?.[mealTime]?.items?.length > 0 ? (
                        <div className="space-y-3">
                          {mealPlan[day][mealTime].items.map(
                            (item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="bg-card rounded-lg shadow-sm p-4"
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <MenuItem item={item} />
                                  <div className="flex gap-2 shrink-0">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                                          <Pencil className="h-4 w-4" />
                                        </button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[600px] w-[95%] p-4 sm:p-6 h-[90vh] sm:h-auto overflow-y-auto">
                                        <DialogHeader>
                                          <DialogTitle>Edit Meal</DialogTitle>
                                          <DialogDescription>
                                            Update the details for this meal.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose ref={closeRef} />
                                        <MenuCreateOrEditForm
                                          day={day}
                                          mealTime={mealTime}
                                          item={item}
                                          closeRef={closeRef}
                                        />
                                      </DialogContent>
                                    </Dialog>

                                    <button
                                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                      onClick={async () =>
                                        await deleteMealItem({
                                          day,
                                          mealTime,
                                          itemId: item._id as string,
                                        })
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">
                            No meals planned yet
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
