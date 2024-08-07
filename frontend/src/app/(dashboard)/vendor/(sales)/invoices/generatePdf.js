// generatePdf.js
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Invoice from './invoice-pdf';

const generatePdf = async (invoiceData) => {
  const blob = await pdf(<Invoice invoiceData={invoiceData} />).toBlob();
  saveAs(blob, 'invoice.pdf');
};

export default generatePdf;
