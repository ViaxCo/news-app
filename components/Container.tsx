import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  isLoading: boolean;
};

const Container = ({ children, isLoading }: Props) => {
  return (
    <div className={` flex flex-col min-h-screen overflow-hidden ${poppins.className}`}>
      <Header isLoading={isLoading} />
      {/* TODO: Check this `sm`, to possibly change the value to 30em or use md */}
      <div className="flex flex-1 flex-col p-2 sm:p-4 mt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default Container;
