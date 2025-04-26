"use client";

import ExpenseCreateOrEditForm from "@/components/expenses/ExpenseCreateOrEditForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodayExpenses } from "@/components/expenses/TodayExpenses";
import { WeeklyExpenses } from "@/components/expenses/WeeklyExpenses";
import { MonthlyExpenses } from "@/components/expenses/MonthlyExpenses";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";
import { useTodayExpenses } from "@/components/expenses/Expenses.action";
import { useTotalExpense } from "./useTotalExpense";

export const CurrentExpenseSection: React.FC = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const closeRef = useRef<HTMLButtonElement>(null);

  const { data, refetch } = useTotalExpense();

  return (
    <>
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ExpenseSummary
          title="Today's Expenses"
          amount={data?.daily ?? 0}
          subtitle={format(new Date(), "MMM d, yyyy")}
        />
        <ExpenseSummary
          title="Weekly Total"
          amount={data?.weekly ?? 0}
          subtitle="This week"
        />
        <ExpenseSummary
          title="Monthly Total"
          amount={data?.monthly ?? 0}
          subtitle={format(new Date(), "MMMM yyyy")}
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">My Expenses</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">+ Add Expenses</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95%] p-3 sm:p-4 md:p-6 max-h-[90vh] sm:h-auto overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
                </DialogDescription>
              </DialogHeader>
              <DialogClose ref={closeRef} />
              <ExpenseCreateOrEditForm
                year={year}
                month={month}
                closeRef={closeRef}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="today" className="space-y-4 sm:space-y-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="today" className="flex-1 sm:flex-none">
                Today
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex-1 sm:flex-none">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1 sm:flex-none">
                Monthly
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <TodayExpenses refetchTotal={refetch} />
            </TabsContent>

            <TabsContent value="weekly">
              <WeeklyExpenses />
            </TabsContent>

            <TabsContent value="monthly">
              <MonthlyExpenses month={month} year={year} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
