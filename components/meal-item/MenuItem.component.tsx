import { MealItem } from "@/helper/types";

export const MenuItem = ({ item }: { item: MealItem }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-base">{item.name}</h4>
      {item.description && (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      )}
      {item.ingredients && item.ingredients.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Ingredients: </span>
          {item.ingredients.join(", ")}
        </div>
      )}
      {item.quantity && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Quantity: </span>
          {item.quantity} {item.unit}
        </div>
      )}
    </div>
  );
};
