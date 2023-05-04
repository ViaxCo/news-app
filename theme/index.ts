import { extendTheme } from "@chakra-ui/react";
import { Libre_Baskerville, Poppins } from "next/font/google";

// Global style overrides
import styles from "./styles";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const libre_baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const overrides = {
  styles,
  fonts: {
    heading: poppins.style.fontFamily,
    body: poppins.style.fontFamily,
    libre_baskerville: libre_baskerville.style.fontFamily,
  },
};

export default extendTheme(overrides);
