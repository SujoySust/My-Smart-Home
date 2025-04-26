import { useQuery } from "@tanstack/react-query";
import { IExpenseTotals } from "./Expenses.types";

export function useTotalExpense() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["total-expense"],
    queryFn: () => fetch("/api/expenses/totals").then((res) => res.json()),
  });

  return {
    data: data as IExpenseTotals,
    refetch,
    isLoading,
    error,
  };
}
