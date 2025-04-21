import mongoose from "mongoose";

export interface IExpense extends Document {
  _id: string;
  title: string;
  amount: number;
  description: string;
  date: Date;
}

export interface IMonthlyExpense extends Document {
  year: number;
  month: number; // 1-12
  expenses: IExpense[];
  totalAmount: number;
}

const ExpenseSchema = new mongoose.Schema<IExpense>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const MonthlyExpenseSchema = new mongoose.Schema<IMonthlyExpense>(
  {
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    expenses: [ExpenseSchema],
    totalAmount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for year and month
MonthlyExpenseSchema.index({ year: 1, month: 1 }, { unique: true });

export const MonthlyExpense =
  mongoose.models.MonthlyExpense ||
  mongoose.model<IMonthlyExpense>("MonthlyExpense", MonthlyExpenseSchema);
