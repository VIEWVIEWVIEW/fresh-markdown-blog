import { Options } from "$fresh/plugins/twind.ts";

import typography from "twind-typography" 

// @ts-ignore - this is a hack to get the theme from the typography package
export default {
  selfURL: import.meta.url,
  plugins: {
    ...typography()
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['Roboto Serif', "Georgia", "Cambria", 'Times New Roman',
          "Times", "serif"],
        sans: ['Roboto', "Helvetica", "Arial", "sans-serif"],
      },
      // deno-lint-ignore no-explicit-any
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.gray.800'),
              '&:hover': {
                color: theme('colors.gray.600'),
              }
            },
            color: theme('colors.gray.800'),
            h1: {
              color: theme('textColor.black'),
              fontFamily: theme('fontFamily.serif'),
              fontWeight: theme('fontWeight.light'),
            },
            h2: {
              color: theme('textColor.black'),
              fontFamily: theme('fontFamily.serif'),
              fontWeight: theme('fontWeight.light'),
            },
            h3: {
              color: theme('textColor.black'),
              fontFamily: theme('fontFamily.serif'),
              fontWeight: theme('fontWeight.light'),
            },
            h4: {
              color: theme('textColor.black'),
              fontFamily: theme('fontFamily.serif'),
              fontWeight: theme('fontWeight.light'),
            },
            h5: {
              color: theme('textColor.black'),
              fontFamily: theme('fontFamily.serif'),
              fontWeight: theme('fontWeight.light'),
            },
          }
        }
      })
    }
  },

} as Options;
