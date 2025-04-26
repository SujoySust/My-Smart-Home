import { DailyBazarSection } from "../bazar/DailyBazar.section";

export const DashboardBazarListSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Bazar List
      </h2>
      <div className="mt-2">
        <div className="text-center text-muted-foreground">
          <DailyBazarSection />
        </div>
      </div>
    </div>
  );
};
