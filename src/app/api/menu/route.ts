// app/api/menu/route.ts
import { NextResponse } from "next/server";

function getClientIp(request: Request): string {
    let ip = request.headers.get("x-forwarded-for") || "";

    // 여러 IP가 있을 경우 첫 번째 IP 선택
    if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
    }

    return ip;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || "";
    const apiUrl = `http://localhost:3001/menu?date=${date}`;

    // 클라이언트 IP 추출
    const clientIp = getClientIp(request);
    console.log("Extracted Client IP:", clientIp);

    try {
        // API 호출 시 헤더에 X-Real-IP를 포함하여 클라이언트 IP 전달
        const res = await fetch(apiUrl, {
            cache: "no-store",
            headers: {
                "Data": clientIp,
            },
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}
