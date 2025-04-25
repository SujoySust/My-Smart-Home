import { IBazarItem } from "@/helper/types/bazar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endOfDay, startOfDay } from "date-fns";
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
