import "../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";

export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div>
            <div>{children}</div>
            <Toaster position="bottom-center" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
