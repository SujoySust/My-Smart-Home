import { Checkbox } from "@/components/ui/checkbox";

interface BazarItemProps {
  name: string;
  amount?: number;
  unit?: string;
  quantity?: number;
  checked?: boolean;
  disabled?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export const BazarItem: React.FC<BazarItemProps> = ({
  name,
  amount,
  unit,
  quantity,
  checked = false,
  disabled = false,
  onCheckChange,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckChange}
        />
        <span
          className={`text-gray-700 dark:text-gray-200 ${
            checked ? "line-through" : ""
          }`}
        >
          {name}
          {quantity !== undefined && unit && ` - ${quantity}${unit}`}
        </span>
      </div>
      {amount !== undefined && (
        <span className="text-sm text-gray-500">৳{amount}</span>
      )}
    </div>
  );
};
