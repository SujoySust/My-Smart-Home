import dbConnect from "@/lib/mongoose";
import { Bazar, IBazarItem } from "@/models/bazar";
import { NextResponse } from "next/server";
import { BAZAR_STATUS } from "./constants";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title, uint, qantity } = body;

    if (!title || !uint || !qantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // Find or create monthly bazar document
    let bazar = await Bazar.findOne({ year, month });

    if (!bazar) {
      bazar = await Bazar.create({
        year,
        month,
        items: [],
      });
    }

    // Add new bazar item
    bazar.items.push({
      title,
      uint,
      qantity,
      date,
      status: BAZAR_STATUS.PENDING,
    });

    await bazar.save();

    return NextResponse.json({
      message: "Bazar item added successfully",
      data: bazar,
    });
  } catch (error) {
    console.error("Error adding bazar item:", error);
    return NextResponse.json(
      { error: "Failed to add bazar item" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    // Find bazars with items in date range
    const bazars = await Bazar.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.date": {
            $gte: start,
            $lte: end,
          },
          "items.status": status,
        },
      },
      {
        $sort: {
          "items.createdAt": -1,
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
          },
          items: { $push: "$items" },
        },
      },
    ]);

    if (bazars.length === 0) {
      return NextResponse.json({
        items: [],
      });
    }

    return NextResponse.json({
      items: bazars[0].items,
    });
  } catch (error) {
    console.error("Error fetching bazar items:", error);
    return NextResponse.json(
      { error: "Failed to fetch bazar items" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { year, month, itemId } = body;

    const bazar = await Bazar.findOne({ year, month });

    if (!bazar) {
      return NextResponse.json({ error: "Bazar not found" }, { status: 404 });
    }

    const itemIndex = bazar.items.findIndex(
      (item: IBazarItem) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Bazar item not found" },
        { status: 404 }
      );
    }

    bazar.items.splice(itemIndex, 1);
    await bazar.save();

    return NextResponse.json({ message: "Bazar item deleted successfully" });
  } catch (error) {
    console.error("Error deleting bazar item:", error);
    return NextResponse.json(
      { error: "Failed to delete bazar item" },
      { status: 500 }
    );
  }
}
