"use client";
import { BazarDayList } from "@/components/bazar/BazarDayList";
import { useState } from "react";

interface BazarWeekItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
}

interface WeekItems {
  week: string;
  items: BazarWeekItem[];
}

export const MonthlyBazarSection: React.FC = () => {
  const [monthlyItems, setMonthlyItems] = useState<WeekItems[]>([
    {
      week: "Week 1",
      items: [
        {
          id: "1",
          name: "Rice and Groceries",
          amount: 2500,
          checked: true,
          disabled: true,
        },
      ],
    },
    {
      week: "Week 2",
      items: [{ id: "2", name: "Meat and Fish", amount: 3000 }],
    },
    {
      week: "Week 3",
      items: [{ id: "3", name: "Vegetables and Fruits", amount: 1800 }],
    },
    {
      week: "Week 4",
      items: [{ id: "4", name: "Household Items", amount: 1500 }],
    },
  ]);

  const handleItemCheckChange = (
    weekIndex: number,
    itemId: string,
    checked: boolean
  ) => {
    setMonthlyItems((prev) =>
      prev.map((week, index) =>
        index === weekIndex
          ? {
              ...week,
              items: week.items.map((item) =>
                item.id === itemId ? { ...item, checked } : item
              ),
            }
          : week
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        This Month's Bazar
      </h2>
      <div className="space-y-4">
        {monthlyItems.map((weekItems, weekIndex) => (
          <BazarDayList
            key={weekItems.week}
            day={weekItems.week}
            items={weekItems.items}
            onItemCheckChange={(itemId, checked) =>
              handleItemCheckChange(weekIndex, itemId, checked)
            }
          />
        ))}
      </div>
    </div>
  );
};
