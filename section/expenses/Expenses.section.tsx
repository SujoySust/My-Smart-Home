"use client";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { CurrentExpenseSection } from "./CurrentExpenses.section";
import { PreviousExpenseSection } from "./PreviousExpenses.section";

export const ExpenseSection: React.FC = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<{
    month: number;
    year: number;
  }>({
    month,
    year,
  });

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            My Expenses
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            My expenses for {format(new Date(), "MMMM")}
          </p>
        </div>

        <select
          className="w-full sm:w-auto bg-background border rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
          onChange={(e) => {
            const [selectedYear, selectedMonth] = e.target.value.split("-");
            setSelectedMonth({
              month: Number(selectedMonth),
              year: Number(selectedYear),
            });
          }}
          defaultValue={`${year}-${month}`}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const d = new Date(year, month - i);
            return (
              <option key={i} value={`${d.getFullYear()}-${d.getMonth()}`}>
                {format(d, "MMMM yyyy")}
              </option>
            );
          })}
        </select>
      </div>

      {selectedMonth?.month == month && selectedMonth?.year == year ? (
        <CurrentExpenseSection />
      ) : (
        <PreviousExpenseSection
          month={selectedMonth.month}
          year={selectedMonth.year}
        />
      )}
    </div>
  );
};
