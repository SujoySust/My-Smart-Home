"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DashboardMealSection } from "./DashboardMeal.section";
import { DashboardBazarListSection } from "./DashboardBazarList.section";
import { DashboardExpenseSection } from "./DashboardExpense.section";

export const DashboardSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6 sm:space-y-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          {format(new Date(), "EEEE, MMMM do")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
        {/* Today's Meal Section */}
        <DashboardMealSection />

        {/* Expenses Section */}
        <DashboardExpenseSection />

        {/* Bazar List Section */}
        <DashboardBazarListSection />
      </div>
    </div>
  );
};
