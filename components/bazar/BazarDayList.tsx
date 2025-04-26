import { IBazarItem } from "@/helper/types/bazar";

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
