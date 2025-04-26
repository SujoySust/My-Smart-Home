import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IExpense } from "../../section/expenses/Expenses.types";
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { toast } from "sonner";

export function useTodayExpenses(refetchTotal?: () => void) {
  const today = new Date();
  const start = startOfDay(today).toISOString();
  const end = endOfDay(today).toISOString();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["today-expenses"],
    queryFn: async () => {
      const response = await fetch(
        `/api/expenses?startDate=${start}&endDate=${end}`
      );
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
      refetch();
      refetchTotal && refetchTotal();
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      const response = await fetch(`/api/expenses`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenseId, month, year }),
      });
      if (!response.ok) toast.error("Failed to delete expense");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      refetch();
      refetchTotal && refetchTotal();
    },
    onError: () => {
      toast.error("Failed to delete expense");
    },
  });

  return {
    data: data as { expenses: IExpense[]; totalAmount: number },
    refetch,
    isLoading,
    isError,
    addExpense: addExpense.mutateAsync,
    deleteExpense: deleteExpense.mutateAsync,
  };
}

export function useWeeklyExpenses() {
  const today = new Date();
  const start = startOfWeek(today).toISOString();
  const end = endOfWeek(today).toISOString();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["weekly-expenses"],
    queryFn: async () => {
      const response = await fetch(
        `/api/expenses?startDate=${start}&endDate=${end}`
      );
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      const response = await fetch(`/api/expenses`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenseId, month, year }),
      });
      if (!response.ok) toast.error("Failed to delete expense");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete expense");
    },
  });
  return {
    data: data as { expenses: IExpense[]; totalAmount: number },
    refetch,
    isLoading,
    isError,
    deleteExpense: deleteExpense.mutateAsync,
  };
}

export function useMonthlyExpenses({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["monthly-expenses", month, year],
    queryFn: async () => {
      const response = await fetch(
        `/api/expenses/all?month=${month}&year=${year}`
      );
      if (!response.ok) throw new Error("Failed to fetch expenses");
      return response.json();
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: string) => {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      const response = await fetch(`/api/expenses`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenseId, month, year }),
      });
      if (!response.ok) toast.error("Failed to delete expense");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete expense");
    },
  });

  return {
    data: data as { expenses: IExpense[]; totalAmount: number },
    refetch,
    isLoading,
    isError,
    deleteExpense: deleteExpense.mutateAsync,
  };
}
