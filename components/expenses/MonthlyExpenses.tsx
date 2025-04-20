"use client";

import { useMonthlyExpenses } from "@/components/expenses/Expenses.action";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ErrorCard } from "../ui/error-card";
import { LoaderCard } from "../ui/loader-card";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseTotal } from "./ExpenseTotal";

export function MonthlyExpenses() {
  const { data, isLoading, isError } = useMonthlyExpenses();

  if (isLoading) {
    return <LoaderCard message="Loading monthly expenses" />;
  }

  if (isError) {
    return <ErrorCard message="Failed to load monthly expenses" />;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Monthly Expenses</h3>
        <span className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No expenses recorded in this month
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data.map((expense, index: number) => (
              <ExpenseItem key={index} expense={expense} />
            ))}
          </div>

          <ExpenseTotal amount={0} />
        </>
      )}
    </Card>
  );
}
