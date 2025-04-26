"use client";
import { BazarDayList } from "@/components/bazar/BazarDayList";
import { useMonthlyBazar } from "./Bazar.action";

export const MonthlyBazarSection: React.FC = () => {
  const { data } = useMonthlyBazar();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        This Month's Bazar
      </h2>
      <div className="space-y-4">
        {data &&
          data.length > 0 &&
          data.map((weekItems, weekIndex) => (
            <BazarDayList
              key={weekIndex}
              day={weekItems.week}
              items={weekItems.items}
            />
          ))}
      </div>
    </div>
  );
};
