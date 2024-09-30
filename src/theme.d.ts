import React from "react";

declare module "@mui/material/styles" {
  interface Theme {
    systemStatus: {
      [key: string]: string;
    };
  }
  interface ThemeOptions {
    systemStatus: {
      [key: string]: React.CSSProperties["color"];
    };
  }

  interface ExtPaletteColor extends PaletteColor {
    light?: string;
    dark?: string;
    main: string;
    0?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface Palette {
    pColor: ExtPaletteColor;
    sColor: ExtPaletteColor;
    tColor: ExtPaletteColor;
    bColor: ExtPaletteColor;
    lColor: ExtPaletteColor;
  }
}
