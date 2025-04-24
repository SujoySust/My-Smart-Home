import { BazarItem } from "./BazarItem";

interface BazarItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
}

interface BazarListProps {
  title: string;
  items: BazarItem[];
  onItemCheckChange?: (id: string, checked: boolean) => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export const BazarList: React.FC<BazarListProps> = ({
  title,
  items,
  onItemCheckChange,
  showAddButton = false,
  onAddClick,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Add Item
          </button>
        )}
      </div>

      <div className="space-y-3">
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
