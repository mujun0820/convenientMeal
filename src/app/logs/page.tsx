"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Ellipsis, RotateCcw } from "lucide-react";

export default function LogsPage() {
    const [password, setPassword] = useState("");
    const [logs, setLogs] = useState<{ general: string[]; error: string[] } | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [autoRefresh, setAutoRefresh] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        setError("");
        setLogs(null);

        try {
            const res = await fetch("/api/logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "오류 발생");
            } else {
                setAuthenticated(true);
                setLogs(data.logs);
            }
        } catch (err) {
            setError("서버 요청 실패");
        } finally {
            setLoading(false);
        }
    };

    // 자동 새로고침
    useEffect(() => {
        if (!autoRefresh || !authenticated) return;
        const interval = setInterval(() => {
            fetchLogs();
        }, 10000); // 10초마다
        return () => clearInterval(interval);
    }, [autoRefresh, authenticated]);

    // 날짜 필터 처리
    const filterLogsByDate = (lines: string[], date: string) => {
        if (!date) return lines;
        return lines.filter((line) => line.includes(date));
    };

    return (
        <div className="p-6 max-w-5xl mx-auto min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors">
            <h1 className="text-3xl font-bold mb-6 text-center">🔐 디미고 간편식 로그 뷰어</h1>

            {!authenticated && (
                <div className="flex flex-col items-center">
                    <div className="flex w-full max-w-md gap-2 mb-3">
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 rounded flex-1 text-sm text-black dark:text-white"
                        />
                        <button
                            onClick={fetchLogs}
                            className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? <Ellipsis /> : <ChevronRight />}
                        </button>
                    </div>
                    {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                </div>
            )}

            {authenticated && logs && (
                <>
                    <div className="flex flex-col md:flex-row gap-4 items-center mt-6 mb-4">
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-black dark:text-white p-2 rounded"
                        />
                        <button
                            onClick={fetchLogs}
                            className="flex justify-center items-center w-9 h-9 border border-gray-400 dark:border-zinc-600 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                        >
                            <RotateCcw size={20} />
                        </button>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={autoRefresh}
                                onChange={(e) => setAutoRefresh(e.target.checked)}
                            />
                            자동 새로고침 (10초)
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">📄 일반 로그</h2>
                            <div className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-white p-3 rounded h-[70vh] overflow-y-scroll text-xs whitespace-pre-wrap font-mono">
                                {filterLogsByDate(logs.general, dateFilter).join("\n\n\n")}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">🚨 에러 로그</h2>
                            <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white p-3 rounded h-[70vh] overflow-y-scroll text-xs whitespace-pre-wrap font-mono">
                                {filterLogsByDate(logs.error, dateFilter).join("\n\n\n")}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
