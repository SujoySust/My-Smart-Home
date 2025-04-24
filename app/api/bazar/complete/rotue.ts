import dbConnect from "@/lib/mongoose";
import { Bazar } from "@/models/bazar";
import { NextResponse } from "next/server";
import { BAZAR_STATUS } from "../constants";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const bazar = await Bazar.findOne({ year, month });

    if (!bazar) {
      return NextResponse.json({ error: "Bazar not found" }, { status: 404 });
    }

    // Find the specific item in the items array
    const item = bazar.items.id(itemId);

    if (!item) {
      return NextResponse.json(
        { error: "Bazar item not found" },
        { status: 404 }
      );
    }

    // Update the status of the specific item
    item.status =
      item.status === BAZAR_STATUS.PENDING
        ? BAZAR_STATUS.COMPLETED
        : BAZAR_STATUS.PENDING;
    await bazar.save();

    return NextResponse.json({
      message: "Bazar item completed successfully",
      data: bazar,
    });
  } catch (error) {
    console.error("Error completing bazar item:", error);
    return NextResponse.json(
      { error: "Failed to complete bazar item" },
      { status: 500 }
    );
  }
}
