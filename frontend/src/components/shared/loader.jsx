import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader() {
  return (
    <div className="w-full h-full bg-opacity-50 z-50 flex items-center justify-center min-h-screen gap-5">
      <div className="flex items-center gap-4">
        <LoaderCircle size={40} className="animate-spin text-primary" />
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
