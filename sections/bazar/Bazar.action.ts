import { IBazarItem } from "@/helper/types/bazar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { toast } from "sonner";

export const useDailyBazar = () => {
  const today = new Date();
  const start = startOfDay(today).toISOString();
  const end = endOfDay(today).toISOString();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["today-bazar"],
    queryFn: async () => {
      const response = await fetch(
        `/api/bazar?startDate=${start}&endDate=${end}`
      );
      if (!response.ok) toast.error("Failed to fetch bazar");
      return response.json();
    },
  });

  const addBazar = useMutation({
    mutationFn: async (data: IBazarItem) => {
      const response = await fetch("/api/bazar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) toast.error("Failed to add bazar");
      return response.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  const completeBazar = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/bazar/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!response.ok) toast.error("Failed to complete bazar");
      return response.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  const deleteBazar = useMutation({
    mutationFn: async (itemId: string) => {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();

      const response = await fetch(`/api/bazar`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, month, year }),
      });
      if (!response.ok) toast.error("Failed to delete bazar");
      return response.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  return {
    data: data?.items as IBazarItem[],
    refetch,
    isLoading,
    isError,
    addBazar: addBazar.mutateAsync,
    deleteBazar: deleteBazar.mutateAsync,
    completeBazar: completeBazar.mutateAsync,
  };
};

export const useWeeklyBazar = () => {
  const today = new Date();
  const start = startOfWeek(today).toISOString();
  const end = endOfWeek(today).toISOString();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["weekly-bazar"],
    queryFn: async () => {
      const response = await fetch(
        `/api/bazar/weekly?startDate=${start}&endDate=${end}`
      );
      if (!response.ok) toast.error("Failed to fetch weekly bazar");
      return response.json();
    },
  });

  return {
    data: data?.weeklyBazar as {
      date: string;
      day: string;
      items: IBazarItem[];
    }[],
    refetch,
    isLoading,
    isError,
  };
};

export const useMonthlyBazar = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["monthly-bazar"],
    queryFn: async () => {
      const response = await fetch(
        `/api/bazar/monthly?month=${month}&year=${year}`
      );
      if (!response.ok) toast.error("Failed to fetch monthly bazar");
      return response.json();
    },
  });

  return {
    data: data?.monthlyBazar as {
      week: string;
      items: IBazarItem[];
    }[],
    refetch,
    isLoading,
    isError,
  };
};
