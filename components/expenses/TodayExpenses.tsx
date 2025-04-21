"use client";

import { useTodayExpenses } from "@/components/expenses/Expenses.action";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ErrorCard } from "../ui/error-card";
import { LoaderCard } from "../ui/loader-card";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseTotal } from "./ExpenseTotal";

export function TodayExpenses() {
  const { data, isLoading, isError, deleteExpense } = useTodayExpenses();

  if (isLoading) {
    return <LoaderCard message="Loading today's expenses" />;
  }

  if (isError) {
    return <ErrorCard message="Failed to load today's expenses" />;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Today's Expenses</h3>
        <span className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </span>
      </div>

      {data?.expenses.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No expenses recorded today
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.expenses.map((expense, index: number) => (
              <ExpenseItem
                key={index}
                expense={expense}
                deleteItem={deleteExpense}
              />
            ))}
          </div>

          <ExpenseTotal amount={data?.totalAmount ?? 0} />
        </>
      )}
    </Card>
  );
}
