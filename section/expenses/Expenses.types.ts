export interface IExpense {
  _id?: string;
  title: string;
  amount: number;
  description: string;
  date: Date;
}

export interface IExpenseTotals {
  daily: number;
  weekly: number;
  monthly: number;
}
