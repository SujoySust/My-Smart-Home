export function ExpenseTotal({ amount }: { amount: number }) {
  return (
    <div className="mt-6 pt-4 border-t">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-lg">BDT {amount}</span>
      </div>
    </div>
  );
}
