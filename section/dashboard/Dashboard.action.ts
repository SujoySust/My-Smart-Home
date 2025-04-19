//

import { DayMeals } from "@/helper/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useDashboardData() {
  const today = format(new Date(), "EEEE").toLowerCase();

  const {
    data: mealPlan,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["todayMealPlan"],
    queryFn: async () => {
      const response = await fetch(`/api/meal-plan/${today}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch weekly meal plan");
      }
      const result = await response.json();
      return result.data;
    },
  });

  return {
    mealPlan: mealPlan as DayMeals,
    isLoading: loading,
    error: queryError,
  };
}
