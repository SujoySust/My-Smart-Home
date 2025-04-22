import { ExpenseSection } from "@/section/expenses/Expenses.section";

export default function BazarPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bazar List
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Manage your daily, weekly and monthly bazar items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Bazar List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Today's Bazar
            </h2>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Add Item
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-gray-700 dark:text-gray-200">
                  Rice - 2kg
                </span>
              </div>
              <span className="text-sm text-gray-500">৳120</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-gray-700 dark:text-gray-200">
                  Vegetables
                </span>
              </div>
              <span className="text-sm text-gray-500">৳80</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Today's Completed Items
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-200 line-through">
                    Rice - 2kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳120</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-200 line-through">
                    Onions - 1kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳60</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-200 line-through">
                    Potatoes - 2kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳80</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Bazar */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          This Week's Bazar
        </h2>
        <div className="space-y-4">
          {/* Monday */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Monday
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Chicken - 1kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳180</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Vegetables
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳100</span>
              </div>
            </div>
          </div>

          {/* Wednesday */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Wednesday
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Fish - 2kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳400</span>
              </div>
            </div>
          </div>

          {/* Friday */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Friday
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Beef - 1kg
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳750</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Spices
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳200</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This Month's Bazar */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          This Month's Bazar
        </h2>
        <div className="space-y-4">
          {/* Week 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Week 1
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-200 line-through">
                    Rice and Groceries
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳2500</span>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Week 2
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Meat and Fish
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳3000</span>
              </div>
            </div>
          </div>

          {/* Week 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Week 3
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Vegetables and Fruits
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳1800</span>
              </div>
            </div>
          </div>

          {/* Week 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Week 4
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Household Items
                  </span>
                </div>
                <span className="text-sm text-gray-500">৳2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
