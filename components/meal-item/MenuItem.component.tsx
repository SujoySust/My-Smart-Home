import { MealItem } from "@/helper/types";

export const MenuItem = ({ item }: { item: MealItem }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-base text-foreground dark:text-white">
        {item.name}
      </h4>
      {item.description && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          {item.description}
        </p>
      )}
      {item.ingredients && item.ingredients.length > 0 && (
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          <span className="font-medium dark:text-gray-300">Ingredients: </span>
          {item.ingredients.join(", ")}
        </div>
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
