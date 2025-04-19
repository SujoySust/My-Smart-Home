// import { MealItem } from "@/helper/types";
// import { useCallback, useState } from "react";
// import { toast } from "sonner";

// interface MealPlanError {
//   message: string;
//   status?: number;
// }

// interface UseMealPlanReturn {
//   addMealItem: (data: {
//     day: string;
//     mealTime: string;
//     item: MealItem;
//   }) => Promise<void>;
//   getMealItems: (day: string, mealTime: string) => Promise<MealItem[]>;
//   updateMealItem: (
//     day: string,
//     mealTime: string,
//     itemId: string,
//     item: Partial<MealItem>
//   ) => Promise<void>;
//   deleteMealItem: (
//     day: string,
//     mealTime: string,
//     itemId: string
//   ) => Promise<void>;
//   loading: boolean;
//   error: MealPlanError | null;
//   clearError: () => void;
// }

// export function useMealPlan(): UseMealPlanReturn {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<MealPlanError | null>(null);

//   const handleError = (error: any) => {
//     console.error("MealPlan Error:", error);
//     const errorMessage = error.message || "An error occurred";
//     setError({
//       message: errorMessage,
//       status: error.status,
//     });
//     toast.error(errorMessage);
//     setLoading(false);
//   };

//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);

//   const addMealItem = useCallback(
//     async (data: { day: string; mealTime: string; item: MealItem }) => {
//       setLoading(true);
//       clearError();

//       try {
//         const response = await fetch(`/api/meal-plan`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to add meal item");
//         }

//         const result = await response.json();
//         toast.success("Meal item added successfully");
//         setLoading(false);
//         return result.data;
//       } catch (error: any) {
//         handleError(error);
//         throw error;
//       }
//     },
//     [clearError]
//   );

//   const getMealItems = useCallback(
//     async (day: string, mealTime: string): Promise<MealItem[]> => {
//       setLoading(true);
//       clearError();

//       try {
//         const response = await fetch(`/api/meal-plan/${day}/${mealTime}`);

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch meal items");
//         }

//         const result = await response.json();
//         setLoading(false);
//         return result.data;
//       } catch (error: any) {
//         handleError(error);
//         throw error;
//       }
//     },
//     [clearError]
//   );

//   const updateMealItem = useCallback(
//     async (
//       day: string,
//       mealTime: string,
//       itemId: string,
//       updates: Partial<MealItem>
//     ) => {
//       setLoading(true);
//       clearError();

//       try {
//         const response = await fetch(`/api/meal-plan`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ day, mealTime, itemId, updates }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to update meal item");
//         }

//         const result = await response.json();
//         toast.success("Meal item updated successfully");
//         setLoading(false);
//         return result.data;
//       } catch (error: any) {
//         handleError(error);
//         throw error;
//       }
//     },
//     [clearError]
//   );

//   const deleteMealItem = useCallback(
//     async (day: string, mealTime: string, itemId: string) => {
//       setLoading(true);
//       clearError();

//       try {
//         const response = await fetch(`/api/meal-plan`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ day, mealTime, itemId }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to delete meal item");
//         }

//         toast.success("Meal item deleted successfully");
//         setLoading(false);
//       } catch (error: any) {
//         handleError(error);
//         throw error;
//       }
//     },
//     [clearError]
//   );

//   return {
//     addMealItem,
//     getMealItems,
//     updateMealItem,
//     deleteMealItem,
//     loading,
//     error,
//     clearError,
//   };
// }
