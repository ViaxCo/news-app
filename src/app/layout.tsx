import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const title = "News App";
const description =
  "News Application that displays the news feed of various articles and each article has a section for comments.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    // TODO: Check if the URL renders correctly in dev and prod
    // url: "https://viaxco-news-app.vercel.app",
    url: "/",
    images: [
      {
        url: "/api/og",
      },
    ],
  },
  twitter: {
    title,
    description,
    card: "summary",
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className={"flex flex-col min-h-screen overflow-hidden"}>
          {/* TODO: Do something about the loading progress bar */}
          {/* <Header isLoading={isLoading} /> */}
          <Header />
          <div className="flex flex-1 flex-col p-2 sm:p-4 mt-20">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
