import { MealItem } from "@/helper/types";
import { Trash2 } from "lucide-react";

export const MenuItem = ({
  item,
  deleteMealItem,
}: {
  item: MealItem;
  deleteMealItem: (params: {
    day: string;
    mealTime: string;
    itemId: string;
  }) => Promise<void>;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2">
        <h4 className="font-semibold text-sm sm:text-base text-foreground dark:text-white break-words">
          {item.name}
        </h4>

        <button
          className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors shrink-0"
          onClick={async () => deleteMealItem}
        >
          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>

      {item.description && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          {item.description}
        </p>
      )}
      {item.quantity && (
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          <span className="font-medium dark:text-gray-300">Quantity: </span>
          {item.quantity} {item.unit}
        </div>
      )}
    </div>
  );
};
