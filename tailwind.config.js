/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import { letterSpacing, sizes } from './tailwind.utils';

export default {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      inter: ['"Inter"'],
      sans: ['Inter', 'sans-serif']
    },

    fontSize: {
      sm: ['14px', { lineHeight: '24px' }],
      h1: ['32px', { lineHeight: '40px' }],
      h2: ['24px', { lineHeight: '28px' }],
      h3: ['20px', { lineHeight: '24px' }],
      subtitle: ['16px', { lineHeight: '20px' }],
      meta: ['16px', { lineHeight: '16px' }],
      body: ['16px', { lineHeight: '24px' }],
      button: ['16px', { lineHeight: '24px' }],
      link: ['14px', { lineHeight: '16px' }]
    },
    screens: {
      '2xs': '0px',
      // => @media (min-width: 0px) { ... }
      xs: '350px',
      // => @media (min-width: 480px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '1200px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },

    spacing: sizes,
    outlineWidth: sizes,
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%'
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900
      },
      colors: {
        inherit: 'inherit',
        backdrop: 'rgba(0, 0, 0, 0.54)',
        transparent: {
          DEFAULT: 'transparent'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          40: 'var(--primary40)',
          50: 'var(--primary50)',
          100: 'var(--primary100)',
          200: 'var(--primary200)',
          300: 'var(--primary300)',
          400: 'var(--primary400)',
          500: 'var(--primary500)',
          600: 'var(--primary600)',
          800: 'var(--primary800)',
          900: 'var(--primary900)'
        },
        indigo: {
          DEFAULT: 'var(--indigo-pirmary)',
          dark: 'var(--indigo-dark-pirmary)',
          secondary: 'var(--indigo-secondary)',
          light: 'var(--indigo-secondary-light)'
        },
        teal: {
          DEFAULT: 'var(--teal-primary)',
          dark: 'var(--teal-dark-primary)',
          secondary: 'var(--teal-secondary)',
          light: 'var(--teal-secondary-light)'
        },
        blue: {
          DEFAULT: 'var(--blue-primary)',
          dark: 'var(--blue-dark-primary)',
          secondary: 'var(--blue-secondary)',
          light: 'var(--blue-secondary-light)'
        },
        violet: {
          DEFAULT: 'var(--violet-primary)',
          dark: 'var(--violet-dark-primary)',
          secondary: 'var(--violet-secondary)',
          light: 'var(--violet-secondary-light)'
        },
        green: {
          DEFAULT: 'var(--green-primary)',
          dark: 'var(--green-dark-primary)',
          secondary: 'var(--green-secondary)',
          light: 'var(--green-secondary-light)'
        },
        orange: {
          DEFAULT: 'var(--orange-primary)',
          dark: 'var(--orange-dark-primary)',
          secondary: 'var(--orange-secondary)',
          light: 'var(--orange-secondary-light)'
        },
        brown: {
          DEFAULT: 'var(--brown-primary)',
          dark: 'var(--brown-dark-primary)',
          secondary: 'var(--brown-secondary)',
          light: 'var(--brown-secondary-light)'
        },
        black: {
          DEFAULT: 'var(--black-primary)',
          dark: 'var(--black-dark-primary)',
          secondary: 'var(--black-secondary)',
          light: 'var(--black-secondary-light)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          100: 'var(--secondary100)',
          200: 'var(--secondary200)',
          300: 'var(--secondary300)',
          light: 'var(--secondary400)'
        },
        white: {
          DEFAULT: `var(--white)`
        },

        gray: {
          DEFAULT: `var(--gray)`,
          light: `var(--gray-light)`,
          image: `var(--gray-image)`,
          disabled: `var(--gray-disabled)`,
          100: `var(--gray100)`,
          200: `var(--gray200)`,
          300: `var(--gray300)`,
          400: `var(--gray400)`,
          500: `var(--gray500)`,
          600: `var(--gray600)`,
          700: `var(--gray700)`
        },
        error: {
          DEFAULT: `var(--func-error)`,
          light: `var(--func-error100)`
        },
        success: {
          DEFAULT: `var(--func-success)`,
          light: `var(--func-success100)`
        },
        warning: {
          DEFAULT: `var(--func-warning)`
        },
        info: {
          DEFAULT: `var(--func-info)`
        },
        available: {
          DEFAULT: `var(--indicator-available)`
        },
        sold: {
          DEFAULT: `var(--indicator-unavailable)`
        },
        reserved: {
          DEFAULT: `var(--indicator-reserved)`
        },
        cancel: '#6F8AE7'
      },
      letterSpacing: letterSpacing,
      minHeight: sizes,
      maxHeight: sizes,
      minWidth: sizes,
      maxWidth: sizes,
      boxShadow: {
        card: '0px 0px 8px 4px rgba(0,0,0,0.08)',
        cardTop: '0px 8px 4px 0px rgba(0, 0, 0, 0.1);',
        button: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
        tableRow: '0px 4px 4px 0px rgba(0, 0, 0, 0.13);',
        menu: '0 2px 8px rgb(0 0 0 / 15%)',
        'arrow-top': '-4px -4px 8px 0px rgb(0 0 0 / 6%)',
        'arrow-bottom': '4px 4px 8px 0px rgb(0 0 0 / 6%)',
        'arrow-right': '4px -4px 8px 0px rgb(0 0 0 / 6%)',
        'arrow-left': '-4px 4px 8px 0px rgb(0 0 0 / 6%)'
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        0.3: '0.3px',
        0.5: '0.5px',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px'
      },
      transitionProperty: {
        height: 'height'
      },
      backgroundImage: {
        checkbox: "url('/src/assets/svg/checkbox.svg)"
      }
    }
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        '.triangle-up': {
          'clip-path': 'polygon(50% 0, 0 100%, 100% 100%)'
        },
        '.triangle-down': {
          'clip-path': 'polygon(50% 100%, 0 0%, 100% 0%)'
        },

        '.triangle-right': {
          'clip-path': 'polygon(0 0, 100% 50%, 0 100%)'
        },

        '.triangle-left': {
          'clip-path': 'polygon(0% 50%, 100% 0, 100% 100%)'
        }
      });
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto'
        }
      });
    })
  ]
};
