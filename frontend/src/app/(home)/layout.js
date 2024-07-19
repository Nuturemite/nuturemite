import "../../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import NavBar from "@/components/shared/home/Navbar";
import Footer from "@/components/shared/home/Footer";
export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className=" text-slate-900 relative">
          <AuthProvider>
          <NavBar />

            <div className="container  max-w-screen-xl  mx-auto">
              <div>{children}</div>
            </div>
            <Footer />
            <Toaster position="bottom-center" />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
