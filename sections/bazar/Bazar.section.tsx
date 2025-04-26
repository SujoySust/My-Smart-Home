"use client";
import { DailyBazarSection } from "./DailyBazar.section";
import { MonthlyBazarSection } from "./MonthlyBazar.section";
import { WeeklyBazarSection } from "./WeeklyBazar.section";

export const BazarSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bazar List
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Manage your daily, weekly and monthly bazar items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
        <DailyBazarSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
        <>
          <WeeklyBazarSection />
          <MonthlyBazarSection />
        </>
      </div>
    </div>
  );
};
