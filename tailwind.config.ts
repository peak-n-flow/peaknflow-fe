import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    extend: {
      fontSize: {
        "display-xxl": [
          "72px",
          {
            lineHeight: "72px",
            letterSpacing: "-1.45px",
            fontWeight: "300",
          },
        ],
        "display-lg": [
          "58px",
          {
            lineHeight: "69.6px",
            letterSpacing: "-1.45px",
            fontWeight: "300",
          },
        ],
        "display-md": [
          "52px",
          {
            lineHeight: "62.4px",
            letterSpacing: "-1.3px",
            fontWeight: "300",
          },
        ],
        "display-sm": [
          "46px",
          {
            lineHeight: "55.2px",
            letterSpacing: "-1.15px",
            fontWeight: "300",
          },
        ],
        "display-xs": [
          "36px",
          {
            lineHeight: "43.2px",
            letterSpacing: "-0.9px",
            fontWeight: "300",
          },
        ],
        h1: [
          "32px",
          {
            lineHeight: "41.6px",
            letterSpacing: "-0.64px",
            fontWeight: "600",
          },
        ],
        h2: [
          "32px",
          {
            lineHeight: "41.6px",
            letterSpacing: "-0.64px",
            fontWeight: "400",
          },
        ],
        h3: [
          "28px",
          {
            lineHeight: "36.4px",
            letterSpacing: "-0.56px",
            fontWeight: "600",
          },
        ],
        h4: [
          "24px",
          {
            lineHeight: "31.2px",
            letterSpacing: "-0.36px",
            fontWeight: "600",
          },
        ],
        h5: [
          "24px",
          {
            lineHeight: "31.2px",
            letterSpacing: "-0.36px",
            fontWeight: "400",
          },
        ],
        h6: [
          "20px",
          {
            lineHeight: "26px",
            letterSpacing: "-0.3px",
            fontWeight: "600",
          },
        ],
        "body-xl": ["18px", { lineHeight: "27px" }],
        "body-lg": ["16px", { lineHeight: "24px" }],
        "body-md": ["14px", { lineHeight: "21px" }],
        "body-sm": ["12px", { lineHeight: "18px" }],
        "body-xs": ["10px", { lineHeight: "15px" }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#322921",
          foreground: "#E4DCD4",
          100: "#322921",
          80: "#635343",
          60: "#A58A6F",
          40: "#DBD0C5",
          20: "#E4DCD4",
        },
        secondary: {
          DEFAULT: "#131211",
          foreground: "#D7D3CD",
          100: "#131211",
          80: "#262422",
          60: "#4B4844",
          40: "#BCB5AB",
          20: "#D7D3CD",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        light: {
          100: "#98A2B3",
          80: "#D0D5DD",
          60: "#EAECF0",
          40: "#F2F4F7",
          20: "#F9FAFB",
        },
        dark: {
          100: "#101828",
          80: "#1D2939",
          60: "#344054",
          40: "#475467",
          20: "#667085",
        },
        success: {
          100: "#20793A",
          80: "#2AA24E",
          60: "#62D083",
          40: "#89DCA2",
          20: "#BFAF0",
        },
        danger: {
          100: "#990000",
          80: "#CC0100",
          60: "#FF566A",
          40: "#FF9999",
          20: "#FFE5E5",
        },
        warning: {
          100: "#CB9701",
          80: "#FFB800",
          60: "#FFB266",
          40: "#FFE599",
          20: "#FFF8E5",
        },
        info: {
          100: "#233852",
          80: "#013B81",
          60: "#006BD2",
          40: "#8FB4D9",
          20: "#E6EFF6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
