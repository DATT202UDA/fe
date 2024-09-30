import localfont from "next/font/local";

export const satoshiFont = localfont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Satoshi-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Regular.woff2",
      weight: "normal",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Bold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-BoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-BoldItalic.woff2",
      weight: "bold",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Black.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-BlackItalic.woff2",
      weight: "700",
      style: "italic",
    },
    // {
    //   path: "../../public/fonts/Satoshi/Satoshi-Black.woff2",
    //   weight: "800",
    // },
    // {
    //   path: "../../public/fonts/Satoshi/Satoshi-BlackItalic.woff2",
    //   weight: "800",
    //   style: "italic",
    // },
  ],
  variable: "--font-satoshi",
});

const typography = {
  fontFamily: satoshiFont.style.fontFamily,
};

export default typography;
