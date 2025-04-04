// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "디미고간편식",
    description: "디미고 간편식 메뉴를 확인할 수 있는 앱",
    themeColor: "#ffffff",
    icons: {
        icon: "/icons/icon-192x192.png",
        shortcut: "/icons/icon-192x192.png",
        apple: "/icons/icon-192x192.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="application-name" content="디미고간편식" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="디미고간편식" />
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
        </head>
        <body className="bg-white dark:bg-zinc-900">{children}</body>
        </html>
    );
}
