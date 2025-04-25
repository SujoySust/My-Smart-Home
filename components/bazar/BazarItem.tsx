import { Checkbox } from "@/components/ui/checkbox";

interface BazarItemProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckChange?: (checked: boolean) => void;
  onDelete?: () => void;
}

export const BazarItem: React.FC<BazarItemProps> = ({
  name,
  checked = false,
  disabled = false,
  onCheckChange,
  onDelete,
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
        </span>
      </div>
      {onDelete && (
        <button
          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          onClick={() => onDelete?.()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
