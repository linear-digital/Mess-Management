/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/util/mongodb";
import User from "@/util/model/userSchema";

export async function GET(req: NextRequest) {
  // Ensure database connection

  connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("email");

  try {
    if (id) {
      const mll = await User.findOne({ email: id }).select("-history");
      if (mll) {
        return NextResponse.json(mll, { status: 200 });
      }
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const mlls = await User.find({
      role: { $in: ["Member", "Manager"] },
    });
    return NextResponse.json(mlls, { status: 200 });
  } catch (error: any) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // get single mils
}

export async function POST(req: NextRequest) {
  try {
    connectDB();

    const body = await req.json();

    const { searchParams } = new URL(req.url);

    const login = searchParams.get("login");

    if (login) {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        const newUser = new User(body);
        await newUser.save();
        return NextResponse.json(
          { message: "User added successfully", user: newUser },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { message: "User already exists", user: user },
        { status: 201 }
      );
    } else {
      const user = await User.findOne({ email: body.email });
      if (user) {
        await User.updateOne({ email: user?.email }, body);
        return NextResponse.json(
          { message: "User already exists", user: user },
          { status: 201 }
        );
      }
      const newMils = new User(body);
      await newMils.save();
      return NextResponse.json(
        { message: "User added successfully", user: body },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const update = searchParams.get("update");
    if (!email) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    if (update) {
      const body = await req.json();
      const mils = await User.updateOne({ email: email }, body, { new: true });

      return NextResponse.json(
        { message: "Data updated successfully", mils: mils },
        { status: 201 }
      );
    }
    const body = await req.json();
    const mils = await User.updateOne(
      { email: email },
      {
        $inc: { paid: body.amount },
        $push: { history: { date: new Date(), amount: body.amount } },
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Data updated successfully", mils: mils },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
