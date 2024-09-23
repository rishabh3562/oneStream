import { NextResponse } from "next/server";

export async function POST(req) {
    return NextResponse.json({ message: "Hello, World! Backend is working." }, { status: 200 });
}

export async function GET(req) {
    return NextResponse.json({ message: "Hello, World! Backend is working." }, { status: 200 });
}
