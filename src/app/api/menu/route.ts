// app/api/menu/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || "";
    const apiUrl = `https://mealapi.mujun0820.com/menu?date=${date}`;

    try {
        const res = await fetch(apiUrl, { cache: "no-store" });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}
