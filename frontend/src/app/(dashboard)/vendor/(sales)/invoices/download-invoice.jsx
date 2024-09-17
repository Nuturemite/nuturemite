// DownloadInvoiceButton.jsx
"use client";
import React, { useState } from "react";
import generatePdf from "./generatePdf";
import { Download } from "lucide-react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const DownloadInvoiceButton = ({ id, isChild = false, children }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/${id}`);
      const invoiceData = response.data.data;
      console.log(invoiceData);
      await generatePdf(invoiceData);
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Generating..." : isChild ? children : <Download className="text-green-500" />}
    </button>
  );
};

export default DownloadInvoiceButton;
