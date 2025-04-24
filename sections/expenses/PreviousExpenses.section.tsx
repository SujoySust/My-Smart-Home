"use client";
import { MonthlyExpenses } from "@/components/expenses/MonthlyExpenses";

export const PreviousExpenseSection: React.FC<{
  month: number;
  year: number;
}> = ({ month, year }: { month: number; year: number }) => {
  return <MonthlyExpenses month={month} year={year} />;
};
