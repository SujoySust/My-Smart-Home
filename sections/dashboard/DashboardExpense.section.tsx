import { useDashboardData } from "./Dashboard.action";

export const DashboardExpenseSection: React.FC = () => {
  const { expenseTotals } = useDashboardData();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Expenses
      </h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Today
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ৳{expenseTotals?.daily ?? 0}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            This Week
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ৳{expenseTotals?.weekly ?? 0}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            This Month
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ৳{expenseTotals?.monthly ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};
