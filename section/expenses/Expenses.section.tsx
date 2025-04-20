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

export const ExpenseSection: React.FC = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 sm:space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          My Expenses
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          My expenses for {format(new Date(), "MMMM")}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
        <ExpenseSummary
          title="Today's Expenses"
          amount={0.0}
          subtitle={format(new Date(), "MMM d, yyyy")}
        />
        <ExpenseSummary
          title="Weekly Total"
          amount={0.0}
          subtitle="Last 7 days"
        />
        <ExpenseSummary
          title="Monthly Total"
          amount={0.0}
          subtitle={format(new Date(), "MMMM yyyy")}
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Expenses</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">+ Add Expenses</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95%] p-4 sm:p-6 h-[90vh] sm:h-auto overflow-y-auto">
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
          {/* Example expense items - replace with actual data mapping */}

          <Tabs defaultValue="today" className="space-y-6">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <TodayExpenses />
            </TabsContent>

            <TabsContent value="weekly">
              <WeeklyExpenses />
            </TabsContent>

            <TabsContent value="monthly">
              <MonthlyExpenses />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
