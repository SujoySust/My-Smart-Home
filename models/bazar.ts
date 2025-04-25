import mongoose from "mongoose";

export interface IBazarItem extends Document {
  _id: string;
  title: string;
  status: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBazar extends Document {
  year: number;
  month: number; // 1-12
  items: IBazarItem[];
}

const BazarItemSchema = new mongoose.Schema<IBazarItem>(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const BazarSchema = new mongoose.Schema<IBazar>(
  {
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    items: [BazarItemSchema],
  },
  {
    timestamps: true,
  }
);

// Create a compound index for year and month
BazarSchema.index({ year: 1, month: 1 }, { unique: true });

export const Bazar =
  mongoose.models.Bazar || mongoose.model<IBazar>("Bazar", BazarSchema);
