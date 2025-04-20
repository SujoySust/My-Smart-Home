import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IExpense } from "../../section/expenses/Expenses.types";

export function useTodayExpenses() {
  const queryClient = useQueryClient();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["today-expenses"],
    queryFn: async () => {
      const response = await fetch(`/api/expenses/today`);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },
  });

  const addExpense = useMutation({
    mutationFn: async (data: {
      year: number;
      month: number;
      expense: IExpense;
    }) => {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add expense");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today-expenses"] });
      refetch();
    },
  });

  return {
    data: data as IExpense[],
    refetch,
    isLoading,
    isError,
    addExpense: addExpense.mutateAsync,
  };
}

export function useWeeklyExpenses() {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["weekly-expenses"],
    queryFn: async () => {
      const response = await fetch(`/api/expenses/today`);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },
  });
  return {
    data: data as IExpense[],
    refetch,
    isLoading,
    isError,
  };
}

export function useMonthlyExpenses() {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["monthly-expenses"],
    queryFn: async () => {
      const response = await fetch(`/api/expenses/today`);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },
  });
  return {
    data: data as IExpense[],
    refetch,
    isLoading,
    isError,
  };
}
