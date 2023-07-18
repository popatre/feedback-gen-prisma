/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "main-bg-pattern":
                    "url('https://www.transparenttextures.com/patterns/cardboard.png')",
            },
            fontFamily: {
                roboto: ["var(--font-roboto)"],
            },
        },
    },
    plugins: [],
};
