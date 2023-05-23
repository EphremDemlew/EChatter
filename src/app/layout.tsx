import { Inter } from "next/font/google";
import "@/styles/global.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ETwitter",
  description: "Get connected with thousands of users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto xl:px-26 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
