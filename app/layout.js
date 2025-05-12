import { Open_Sans } from "next/font/google";
import "react-phone-input-2/lib/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";
import Initialize from "./Initialize";
import NavBar from "@/components/layoutElements/NavBar";
import Footer from "@/components/layoutElements/Footer";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { _getUser } from "@/apiServices/authServices";

const open_Sans = Open_Sans({
  // weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Zim Startup",
  description: "Zim Startup",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions());

  let user;
  if (session) {
    const res = await _getUser(session);
    user = res.data;
  }

  return (
    <html lang="en">
      <body className={open_Sans.className}>
        <ReduxProvider>
          <Suspense fallback={<>Loading...</>}>
            <Initialize user={user} />
            <NavBar session={session} />
          </Suspense>

          {children}
          <Suspense fallback={<>Loading...</>}>
            {/* <Footer /> */}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
