"use client";
import { BazarDayList } from "@/components/bazar/BazarDayList";
import { useWeeklyBazar } from "./Bazar.action";

export const WeeklyBazarSection: React.FC = () => {
  const { data } = useWeeklyBazar();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        This Week's Bazar
      </h2>
      <div className="space-y-4">
        {data &&
          data?.length > 0 &&
          data?.map((dayItems, dayIndex) => (
            <BazarDayList
              key={dayIndex}
              day={dayItems.day}
              items={dayItems.items}
            />
          ))}
      </div>
    </div>
  );
};
