const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primaryColor: "#4C6CB2",
        primaryColor_01: "#1b53ce",
        primaryColor_02: "#335DBA",
        primaryLightColor: "#F5FBFF",
        primaryLightColor_02: "#A8B9DF",
        primaryLightColor_03: "rgba(51, 93, 186, 0.11)",
        whiteColor: "#ffffff",
        whiteColor_02: "#FEFEFF",
        darkColor: "#1F1F1F",
        darkColor_02: "#3D4A63",
        darkLightColor_03: "#0000002b",
        grayColor: "#767D8B",
        grayColor2: "#DCDCDD",
        lightGrayColor: "#FAFAFB",
        lightGrayColor2: "#F6F6F6",
        lightColorWhite: "#F5FBFF",
        lightColorWhite2: "#ECECEE",
        lightColorblue: "#DDEBF9",
        lightColorblue_02: "#F2F7FF",
        greenColor01: "#32A840",
        greenLightColor: "#EAF9F3",
        redColor01: "#FE4D4F",
        redLightColor: "#FEF5F5",
        orangeColor: "#FC9C0F",
        orangeLightColor: "#FBF0E1"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
      maxWidth: {
        sm: "768px",
        md: "980px",
        lg: "1150px",
        xl: "1280px",
        "2xl": "1536px"
      },

      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #1b53ce 0%, #364d7e 100%)",
        "custom-gradient-2":
          "linear-gradient(179deg, rgba(51, 93, 186, 0.00) 24.25%, rgba(51, 93, 186, 0.07) 78.64%)"
      }
    }
  },
  plugins: [flowbite.plugin(), require("tailwindcss-animate")]
});


