import { IExpense } from "@/section/expenses/Expenses.types";

export function ExpenseItem({ expense }: { expense: IExpense }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="font-medium">{expense.description}</div>
        <div className="text-sm text-gray-500 capitalize">{expense.title}</div>
      </div>
      <div className="font-semibold">BDT {expense.amount.toFixed(2)}</div>
    </div>
  );
}
