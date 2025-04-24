"use client";
import { BazarDayList } from "@/components/bazar/BazarDayList";
import { useState } from "react";

interface BazarDayItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
}

interface DayItems {
  day: string;
  items: BazarDayItem[];
}

export const WeeklyBazarSection: React.FC = () => {
  const [weeklyItems, setWeeklyItems] = useState<DayItems[]>([
    {
      day: "Monday",
      items: [
        { id: "1", name: "Chicken", quantity: 1, unit: "kg", amount: 180 },
        { id: "2", name: "Vegetables", amount: 100 },
      ],
    },
    {
      day: "Wednesday",
      items: [{ id: "3", name: "Fish", quantity: 2, unit: "kg", amount: 400 }],
    },
    {
      day: "Friday",
      items: [
        { id: "4", name: "Beef", quantity: 1, unit: "kg", amount: 750 },
        { id: "5", name: "Spices", amount: 200 },
      ],
    },
  ]);

  const handleItemCheckChange = (
    dayIndex: number,
    itemId: string,
    checked: boolean
  ) => {
    setWeeklyItems((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              items: day.items.map((item) =>
                item.id === itemId ? { ...item, checked } : item
              ),
            }
          : day
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        This Week's Bazar
      </h2>
      <div className="space-y-4">
        {weeklyItems.map((dayItems, dayIndex) => (
          <BazarDayList
            key={dayItems.day}
            day={dayItems.day}
            items={dayItems.items}
            onItemCheckChange={(itemId, checked) =>
              handleItemCheckChange(dayIndex, itemId, checked)
            }
          />
        ))}
      </div>
    </div>
  );
};
