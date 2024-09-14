// generatePdf.js
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Invoice from './invoice-pdf';
import InvoicePDF from './invoice';

const invoiceData = {
  invoiceNo: 'C026882400000043',
  date: '2024-08-16',
  orderId: 'PO22824229020794',
  seller: {
    name: 'Nuturemite',
    address: '5-36-226/Nr 2Nd Floor Balnagar Prashanth Nagar Kukatpallyt, Hyderabad, Telangana, 500072, India',
    gst: '36AAUFN0688F1ZS',
  },
  buyer: {
    name: 'TL Balasubramanian',
    address: 'Plot no 9, sakthi villas, Minakarapalli road, opposite to Govt arts and science college, Hosur, Barath Nagar, Hosur, 635110, IN',
    contact: '9994585682',
  },
  products: [
    {
      name: 'Ginkgo Biloba Ginseng Vegetarian Capsule',
      qty: 1,
      mrp: 619.0,
      discount: 68.03,
      total: 550.97,
    },
  ],
  grossAmount: 619.0,
  discountAmount: 68.03,
  payableAmount: 551.0,
};

const generatePdf = async () => {
  const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
  saveAs(blob, 'invoice.pdf');
};

export default generatePdf;
