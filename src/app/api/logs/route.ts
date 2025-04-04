// app/api/logs/route.ts
function getClientIp(request: Request): string {
    let ip = request.headers.get("x-forwarded-for") || "";

    // 여러 IP가 있을 경우 첫 번째 IP 선택
    if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
    }

    return ip;
}
export async function POST(request: Request) {
    try {
        const body = await request.json();
        // 클라이언트 IP 추출
        const clientIp = getClientIp(request);

        // 로그 API 호출 시 헤더에 X-Client-IP 포함
        const response = await fetch("http://localhost:3001/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Data": clientIp,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Proxy 서버 오류" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
