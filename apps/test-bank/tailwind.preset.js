const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      text: {
        primary: 'hsl(var(--text-primary))',
        secondary: 'hsl(var(--text-secondary))',
        tertiary: 'hsl(var(--text-tertiary))',
      },
      bg: {
        primary: 'hsl(var(--bg-primary))',
        secondary: 'hsl(var(--bg-secondary))',
        tertiary: 'hsl(var(--bg-tertiary))',
      },
      border: {
        muted: `var(--border-muted)`,
      },
      brand: 'hsl(var(--brand))',
      'brand-light': 'hsl(var(--brand-light))',
      transparent: 'transparent',
      current: 'currentColor',

      // Status colors
      danger: 'hsl(var(--danger))',
      info: 'hsl(var(--info))',
      success: 'hsl(var(--success))',
      muted: 'hsl(var(--muted))',
      warning: 'hsl(var(--warning))',
      error: 'hsl(var(--error))',
    },
    fontSize: {
      xl: ['24px', { lineHeight: '120%' }],
      lg: ['20px', { lineHeight: '120%' }],
      base: ['16px', { lineHeight: '120%' }],
      sm: ['14px', { lineHeight: '120%' }],
      xs: ['13px', { lineHeight: '120%' }],
      caption1: ['12px', { lineHeight: '120%' }],
      caption2: ['10px', { lineHeight: '120%' }],
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        special:
          '0px 0px 1px 0px #2CB43C1A, 0px 2px 2px 0px #2CB43C17, 1px 4px 2px 0px #2CB43C0D, 2px 7px 3px 0px #2CB43C03, 2px 11px 3px 0px #2CB43C00',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-radix')()],
};
