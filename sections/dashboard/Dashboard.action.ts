//

import { DayMeals } from "@/helper/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { IExpenseTotals } from "../expenses/Expenses.types";

export function useDashboardData() {
  const today = format(new Date(), "EEEE").toLowerCase();

  const { data: mealPlan } = useQuery({
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

  const { data: expenseTotals } = useQuery({
    queryKey: ["expenseTotals"],
    queryFn: async () => {
      const response = await fetch("/api/expenses/totals");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch expense totals");
      }
      const result = await response.json();
      return result;
    },
  });

  return {
    mealPlan: mealPlan as DayMeals,
    expenseTotals: expenseTotals as IExpenseTotals,
  };
}
