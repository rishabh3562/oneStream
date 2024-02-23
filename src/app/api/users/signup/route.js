import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Creator from "@/models/creatorModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password, type } = reqBody;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            type,
        });

        const savedUser = await newUser.save();

        const newCreator = new Creator({
            username,
            email,
            password: hashedPassword,
        });

        const savedCreator = await newCreator.save();

        if (savedUser.creatorId === undefined) {
            savedUser.creatorId = [];
        }

        savedUser.creatorId.push(savedCreator._id);
        await savedUser.save();

        return NextResponse.json({
            message: "User and Creator created successfully",
            success: true,
            savedUser,
            savedCreator,
        });
    } catch (error) {
        console.error("Error in signup API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
