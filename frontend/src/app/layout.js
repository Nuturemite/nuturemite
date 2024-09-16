import "../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import { CartProvider } from "@/context/cartprovider";
import Script from "next/script";
export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            <div>
              <Script src="https://checkout.razorpay.com/v1/checkout.js" />
              <div>{children}</div>
              <Toaster position="bottom-center" />
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
