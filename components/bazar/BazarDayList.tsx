import { BazarItem } from "./BazarItem";

interface BazarDayItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
}

interface BazarDayListProps {
  day: string;
  items: BazarDayItem[];
  onItemCheckChange?: (id: string, checked: boolean) => void;
}

export const BazarDayList: React.FC<BazarDayListProps> = ({
  day,
  items,
  onItemCheckChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
        {day}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <BazarItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            unit={item.unit}
            quantity={item.quantity}
            checked={item.checked}
            disabled={item.disabled}
            onCheckChange={(checked) => onItemCheckChange?.(item.id, checked)}
          />
        ))}
      </div>
    </div>
  );
};
