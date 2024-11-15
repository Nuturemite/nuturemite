import "../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import { CartProvider } from "@/context/cartprovider";
import Script from "next/script";
import logo from "@/assests/logo.jpeg";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Nuturemite</title>
        <meta
          name="description"
          content="Discover expert health tips, natural remedies, and wellness advice at Nuturemite. Empower your lifestyle with nutritious recipes, fitness routines, and holistic solutions for a healthier you."
        />
        <link rel="icon" href={logo.src} type="image/x-icon" />
      </head>
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
