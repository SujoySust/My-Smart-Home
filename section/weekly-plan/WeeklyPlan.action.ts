import {
  WEEKLY_PLAN_DAYS,
  WEEKLY_PLAN_DAYS_VALUES,
  WEEKLY_PLAN_MEAL_TIMES,
  WEEKLY_PLAN_MEAL_TIMES_VALUES,
} from "@/helper/constants/weekly_plan.constant";
import { MealItem, WeeklyMealPlan } from "@/helper/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface MealPlanError {
  message: string;
  status?: number;
}

export function useWeeklyMealPlanAction() {
  const [weekDays, setWeekDays] = useState<WEEKLY_PLAN_DAYS[]>(
    WEEKLY_PLAN_DAYS_VALUES
  );
  const [mealTimes, setMealTimes] = useState<WEEKLY_PLAN_MEAL_TIMES[]>(
    WEEKLY_PLAN_MEAL_TIMES_VALUES
  );

  const today = new Date();
  const todayDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const todayDayValue = todayDay.toLowerCase();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WEEKLY_PLAN_DAYS | undefined>(
    todayDayValue as WEEKLY_PLAN_DAYS
  );
  const [selectedMealTime, setSelectedMealTime] = useState<
    WEEKLY_PLAN_MEAL_TIMES | undefined
  >(undefined);

  useEffect(() => {
    if (selectedDay) {
      setWeekDays([selectedDay]);
    } else {
      setWeekDays(WEEKLY_PLAN_DAYS_VALUES);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (selectedMealTime) {
      setMealTimes([selectedMealTime]);
    } else {
      setMealTimes(WEEKLY_PLAN_MEAL_TIMES_VALUES);
    }
  }, [selectedMealTime]);

  const queryClient = useQueryClient();

  // Query for fetching meal plan
  const {
    refetch: refetchMealPlan,
    data: mealPlan,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["mealPlan"],
    queryFn: async () => {
      const response = await fetch(`/api/meal-plan`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch weekly meal plan");
      }
      const result = await response.json();
      return result.data;
    },
  });

  // Mutation for adding meal item
  const addMealItemMutation = useMutation({
    mutationFn: async (data: {
      day: string;
      mealTime: string;
      item: MealItem;
    }) => {
      const response = await fetch(`/api/meal-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add meal item");
      }

      const result = await response.json();
      return result.data;
    },
    onSuccess: async (_, variables) => {
      toast.success("Meal item added successfully");

      // Force refetch by invalidating and waiting
      await queryClient.invalidateQueries({ queryKey: ["mealPlan"] });
      await queryClient.invalidateQueries({
        queryKey: ["mealItems", variables.day, variables.mealTime],
      });

      // Ensure refetch happens
      await refetchMealPlan();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mutation for updating meal item
  const updateMealItemMutation = useMutation({
    mutationFn: async ({
      day,
      mealTime,
      item,
    }: {
      day: string;
      mealTime: string;
      item: MealItem;
    }) => {
      const response = await fetch(`/api/meal-plan`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day, mealTime, item }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update meal item");
      }

      const result = await response.json();
      return result.data;
    },
    onSuccess: async (_, variables) => {
      toast.success("Meal item updated successfully");

      // Force refetch by invalidating and waiting
      await queryClient.invalidateQueries({ queryKey: ["mealPlan"] });
      await queryClient.invalidateQueries({
        queryKey: ["mealItems", variables.day, variables.mealTime],
      });

      // Ensure refetch happens
      await refetchMealPlan();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mutation for deleting meal item
  const deleteMealItemMutation = useMutation({
    mutationFn: async ({
      day,
      mealTime,
      itemId,
    }: {
      day: string;
      mealTime: string;
      itemId: string;
    }) => {
      const response = await fetch(`/api/meal-plan/${day}/${mealTime}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete meal item");
      }
    },
    onSuccess: () => {
      toast.success("Meal item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["mealPlan"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const error = queryError as MealPlanError | null;

  const clearError = useCallback(() => {
    // With React Query, errors are handled automatically
  }, []);

  return {
    weekDays,
    mealTimes,
    mealPlan: mealPlan as WeeklyMealPlan,
    refetchMealPlan,
    openDialog,
    setOpenDialog,
    addMealItem: addMealItemMutation.mutateAsync,
    deleteMealItem: deleteMealItemMutation.mutateAsync,
    updateMealItem: updateMealItemMutation.mutateAsync,
    selectedDay,
    selectedMealTime,
    setSelectedDay,
    setSelectedMealTime,
    loading,
    error,
    clearError,
  };
}
