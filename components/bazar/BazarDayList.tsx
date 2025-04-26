import { IBazarItem } from "@/helper/types/bazar";
import { BazarItem } from "./BazarItem";

interface BazarDayListProps {
  day: string;
  items: IBazarItem[];
}

export const BazarDayList: React.FC<BazarDayListProps> = ({ day, items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
        {day}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <BazarItem
            key={index}
            name={item.title}
            checked={true}
            disabled={true}
          />
        ))}
      </div>
    </div>
  );
};
