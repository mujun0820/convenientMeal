import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withPWA = require("next-pwa")({
    dest: "public",
    // 개발환경에서는 PWA 기능을 비활성화하려면:
    disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
    reactStrictMode: true,
    // 기타 Next.js 설정 ...
});

export default nextConfig;
