import { useQuery } from "@tanstack/react-query";
import { IExpenseTotals } from "./Expenses.types";

export function useTotalExpense() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["total-expense"],
    queryFn: () => fetch("/api/expenses/totals").then((res) => res.json()),
  });

  return { data: data as IExpenseTotals, isLoading, error };
}
