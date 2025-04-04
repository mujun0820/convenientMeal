// tailwind.config.js
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: { min: "100px", max: "819px" },
            md: { min: "820px", max: "1023px" },
            lg: { min: "1024px" },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                // pretendard: ["var(--font-pretendard)"],
                // Gmarket: ['var(--font-Gmarket)'],
                // onepop: ['var(--font-onepop)'],
            },
        },
    },
    plugins: [],
};
