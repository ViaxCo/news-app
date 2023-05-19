import { Libre_Baskerville } from "next/font/google";
import Link from "next/link";

const libre_baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Header = () => {
  return (
    <header className="p-4 text-center fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <h1 className={`font-semibold ${libre_baskerville.className}`}>
        <Link href="/page/1" className="hover:no-underline">
          News App
        </Link>
      </h1>
    </header>
  );
};

export default Header;
