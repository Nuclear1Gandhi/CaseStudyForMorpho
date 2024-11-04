/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      background: {
        block: '#FAFCFF',
        base: '#EBEDF5',
        secondary: "#191D2008",
      },
      border: {
        primary: '#434C5326',

      },
      color: {
        body: '#191D20F2',
        secondary: '#434C53B2',
        tertiary: '#434C5380',
        interactive: {
          disabled: '#434C5366',
          error: '#C73E59F2',
          valid: '#39A699F2'
        }
      },
      button: {
        primary: '#FFFFFF'
      },
      constants: {
        color: {
          active: '#4493ED',
        }
      }
    },
    backgroundImage: {
      primary: 'linear-gradient(223.53deg, rgba(165, 254, 202, 0.8) 3.65%, rgba(62, 220, 235, 0.8) 31.56%, rgba(37, 148, 255, 0.8) 65.16%, rgba(85, 51, 255, 0.8) 102.22%);',
      primaryHover: 'linear-gradient(223.53deg, rgba(165, 254, 202, 0.9) 3.65%, rgba(62, 220, 235, 0.9) 31.56%, rgba(37, 148, 255, 0.9) 65.16%, rgba(85, 51, 255, 0.9) 102.22%);',
      primaryActive: 'linear-gradient(223.53deg, #A5FECA 3.65%, #3EDCEB 31.56%, #2594FF 65.16%, #5533FF 102.22%);',
      primaryDisabled: 'linear-gradient(223.53deg, rgba(165, 254, 202, 0.3) 3.65%, rgba(62, 220, 235, 0.3) 31.56%, rgba(37, 148, 255, 0.3) 65.16%, rgba(85, 51, 255, 0.3) 102.22%);'
    },
    boxShadow: {
      dp4: '0rem 0.1875rem 0.75rem 0rem #00000017;'
    },
    extend: {
      fontSize: {
        xxxs: '0.6875rem',
        xxs: '0.75rem',
        xs: '0.8125rem'
      },
      gap: {
        12.5: '3.125rem' 
      },
    },
  },
  plugins: [],
}

