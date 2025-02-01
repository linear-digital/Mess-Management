/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/util/mongodb";
import Mills from "@/util/model/schema";
import User from "@/util/model/userSchema";
import moment from "moment";

export async function GET(req: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Extract the `id` from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const month = searchParams.get("month");
    const email = searchParams.get("email");
    if (id) {
      // Fetch the single mill by its id
      const mill = await Mills.findById(id);
      if (!mill) {
        return NextResponse.json(
          { message: "Mill not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(mill, { status: 200 });
    } else {
      let filters: any = {
        email: email,
      };
      if (month) {
        const startDate = new Date(month);
        startDate.setDate(1);
        const endDate = new Date(month);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        filters.date = {
          $gte: startDate,
          $lte: endDate,
        };
      }
      // Fetch all mills if no id is provided
      const mills = await Mills.find(filters).sort({ createdAt: -1 });
      const total = mills.reduce((acc, item) => acc + item.quantity, 0);
      let totalBill = 0;
      for (let i = 0; i < mills.length; i++) {
        totalBill += mills[i].quantity * mills[i].price;
      }
      const totalMill = await Mills.find({ email: email }).sort({
        createdAt: -1,
      });
      const totalMillCount = totalMill.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const user = await User.findOne({ email: email });

      const data = {
        data: mills,
        total: total,
        totalBill: totalMillCount * 70 || 0,
        bill:
          user?.paid - totalMillCount * 70 < 0
            ? user?.paid -
              totalMillCount * 70 -
              (user?.paid - totalMillCount * 70) * 2
            : user?.paid - totalMillCount * 70,
        paid: user?.paid || 0,
        user: user,
      };
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Connect to the database (assuming a database connection function)
    await connectDB();

    // Parse the request body as JSON
    const data = await req.json();

    // Validate required fields (if applicable)
    if (!data.email || !data.date) {
      return NextResponse.json(
        { message: "Missing required fields: email and date" },
        { status: 400 }
      );
    }

    // Check for existing data with the same email and date (using a more efficient index)
    const alldata = await Mills.find({ email: data.email }); // Sort by latest first
    const isExist = await alldata.find(
      (item) =>
        moment(item.date).format("l") === moment(data.date).format("l") &&
        item.time === data.time
    );
    if (isExist) {
      return NextResponse.json(
        { message: "You have assigned this already" },
        { status: 400 }
      );
    }

    // Create a new Mills instance with sanitized data (consider data sanitization)
    const newMils = new Mills(data);

    // Save the new data to the database
    await newMils.save();

    return NextResponse.json(
      { message: "Mils added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    await Mills.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Data deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
