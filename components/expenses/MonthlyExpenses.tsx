"use client";

import { useMonthlyExpenses } from "@/components/expenses/Expenses.action";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ErrorCard } from "../ui/error-card";
import { LoaderCard } from "../ui/loader-card";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseTotal } from "./ExpenseTotal";
import { MONTH_MAP } from "@/helper/constants/expense.constant";

export function MonthlyExpenses({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { data, isLoading, isError } = useMonthlyExpenses({ year, month });

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
          {MONTH_MAP[month]}, {year}
        </span>
      </div>

      {data?.expenses?.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No expenses recorded in this month
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.expenses?.map((expense, index: number) => (
              <ExpenseItem key={index} expense={expense} />
            ))}
          </div>

          <ExpenseTotal amount={data.totalAmount} />
        </>
      )}
    </Card>
  );
}
