const colors = require('tailwindcss/colors');
var convert = require('color-convert').default;

module.exports = {
  content: ["./views/**/*.{html,templ}"],
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      white: colors.white,
      grey: colors.zinc,
      primary: colors.blue,
      info: colors.blue,
      success: colors.emerald,
      danger: colors.rose,
      warning: colors.amber,
    }
  },
  plugins: [
    function({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          let cssVariable = colorKey === "DEFAULT" ? `--${colorGroup}` : `--${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable.replace(/^\-+/, '--')]: value }
              : extractColorVars(value, `${colorKey}`);

          const hsl = convert.hex.hsl(value);
          const hslVariable = `${cssVariable}-hsl`;
          newVars[hslVariable.replace(/^\-+/, '--')] = `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;

          return { ...vars, ...newVars };
        }, {});
      }

      function extractFontWeightVars(fontWeightObj) {
        return Object.keys(fontWeightObj).reduce((vars, weightKey) => {
          const value = fontWeightObj[weightKey];
          const cssVariable = `--font-${weightKey}`;

          return {
            ...vars,
            [cssVariable]: value,
          };
        }, {});
      }

      function extractFontSizeVars(fontSizeObj) {
        return Object.keys(fontSizeObj).reduce((vars, fontSizeKey) => {
          const value = fontSizeObj[fontSizeKey][0];
          const cssVariable = `--text-${fontSizeKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : {};

          return { ...vars, ...newVars };
        }, {});
      }

      function static() {
        return {
          "--focus-ring": "1px auto var(--primary-500)",
          "--focus-ring-offset": "5px",
          "--bevel": "0 1px 0 hsl(0deg 0% 0% / 0.1)",
          "--input-border": "1px solid var(--grey-300)",
          "--button-shadow": "0px 1px 2px -1px rgba(0, 0, 0, 0.09), inset 0px -1px 0px 1px rgba(0, 0, 0, 0.06)",
        }
      }

      addBase({
        ':root': { ...extractColorVars(theme('colors')), ...extractFontWeightVars(theme('fontWeight')), ...extractFontSizeVars(theme('fontSize')), ...static() },
      });
    },

  ],
}
