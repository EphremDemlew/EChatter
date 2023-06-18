import { Inter } from "next/font/google";
import "@/styles/global.css";
import Sidebar from "@/components/layout/Sidebar";
import FollowBar from "@/components/layout/FollowBar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";

import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter",
  description: "Get connected with thousands of users.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toaster />
          <LoginModal />
          <EditModal />
          <RegisterModal />
          <div className="h-screen bg-black overflow-y-scroll scrollbar-hide">
            <div className="container h-full mx-auto xl:px-26 max-w-6xl">
              <div className="grid grid-cols-4 h-full  ">
                <div className="col-span-1 h-screen pr-4 md:pr-6 flex justify-end">
                  <Sidebar />
                </div>
                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 overflow-visible">
                  {children}
                </div>
                <div>
                  <FollowBar />
                </div>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
