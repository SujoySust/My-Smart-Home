"use client";

import { useWeeklyExpenses } from "@/components/expenses/Expenses.action";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { LoaderCard } from "../ui/loader-card";
import { ErrorCard } from "../ui/error-card";
import { ExpenseTotal } from "./ExpenseTotal";
import { ExpenseItem } from "./ExpenseItem";

export function WeeklyExpenses() {
  const { data, isLoading, isError, deleteExpense } = useWeeklyExpenses();

  if (isLoading) {
    return <LoaderCard message="Loading weekly expenses" />;
  }

  if (isError) {
    return <ErrorCard message="Failed to load weekly expenses" />;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Weekly Expenses</h3>
        <span className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </span>
      </div>

      {data?.expenses?.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No expenses recorded in this week
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.expenses?.map((expense, index: number) => (
              <ExpenseItem
                key={index}
                expense={expense}
                deleteItem={deleteExpense}
              />
            ))}
          </div>

          <ExpenseTotal amount={data.totalAmount} />
        </>
      )}
    </Card>
  );
}
