import type { Config } from "tailwindcss"

export default {
   content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   plugins: [require("daisyui")], // eslint-disable-line @typescript-eslint/no-require-imports
   daisyui: {
     themes: [
       {
         light: {
           "primary": "#303030", // Very dark gray
           "primary-content": "#ffffff", // White text
           "base-100": "#ffffff", // White background
         },
       },
     ],
     darkTheme: "black",
     base: true,
     styled: true,
     utils: true,
   },
   theme: {
     fontFamily: {
       sans: ['Roboto Condensed', 'sans-serif'],
       mono: [
         'Monaco',
         'ui-monospace',
         'SFMono-Regular',
         'Menlo',
         'Consolas',
         'Liberation Mono',
         'Courier New',
         'monospace'
       ]
     },
     extend: {
       colors: {
         background: "var(--background)",
         foreground: "var(--foreground)",
       },
       fontSize: {
        'xs':   ['0.7rem',   { lineHeight: '1rem' }],    // 7px
        'sm':   ['0.8rem',   { lineHeight: '1.2rem' }],  // 8px
        'base': ['1rem',     { lineHeight: '1.6rem' }],  // 10px (regular text)
        'lg':   ['1.2rem',   { lineHeight: '1.8rem' }],  // 12px (headers)
        'xl':   ['1.4rem',   { lineHeight: '2rem' }],    // 14px
        '2xl':  ['1.6rem',   { lineHeight: '2.2rem' }],  // 16px
        '3xl':  ['1.8rem',   { lineHeight: '2.4rem' }],  // 18px
        '4xl':  ['2rem',     { lineHeight: '2.6rem' }],  // 20px
        '5xl':  ['2.4rem',   { lineHeight: '3rem' }],    // 24px
        '6xl':  ['2.8rem',   { lineHeight: '3.4rem' }],  // 28px
        '7xl':  ['3.2rem',   { lineHeight: '3.8rem' }],  // 32px
        '8xl':  ['3.6rem',   { lineHeight: '4.2rem' }],  // 36px
        '9xl':  ['4rem',     { lineHeight: '4.6rem' }],  // 40px
       }
     }
   }
 } satisfies Config
