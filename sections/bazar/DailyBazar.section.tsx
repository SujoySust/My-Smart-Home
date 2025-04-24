"use client";
import { BazarList } from "@/components/bazar/BazarList";
import { useState } from "react";

interface BazarItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
}

export const DailyBazarSection: React.FC = () => {
  const [todayItems, setTodayItems] = useState<BazarItem[]>([
    { id: "1", name: "Rice", quantity: 2, unit: "kg", amount: 120 },
    { id: "2", name: "Vegetables", amount: 80 },
  ]);

  const [completedItems, setCompletedItems] = useState<BazarItem[]>([
    {
      id: "3",
      name: "Rice",
      quantity: 2,
      unit: "kg",
      amount: 120,
      checked: true,
      disabled: true,
    },
    {
      id: "4",
      name: "Onions",
      quantity: 1,
      unit: "kg",
      amount: 60,
      checked: true,
      disabled: true,
    },
    {
      id: "5",
      name: "Potatoes",
      quantity: 2,
      unit: "kg",
      amount: 80,
      checked: true,
      disabled: true,
    },
  ]);

  const handleItemCheckChange = (id: string, checked: boolean) => {
    setTodayItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked } : item))
    );
  };

  return (
    <>
      <BazarList
        title="Today's Bazar"
        items={todayItems}
        onItemCheckChange={handleItemCheckChange}
        showAddButton
        onAddClick={() => {
          // TODO: Implement add item functionality
          console.log("Add item clicked");
        }}
      />
      <BazarList title="Today's Completed Items" items={completedItems} />
    </>
  );
};
