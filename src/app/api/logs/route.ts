export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch("https://mealapi.mujun0820.com/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {"Content-Type": "application/json"},
        });
    } catch (err) {
        return new Response(JSON.stringify({error: "Proxy 서버 오류"}), {
            status: 500,
            headers: {"Content-Type": "application/json"},
        });
    }
}
