import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    border: '1px solid black',
  },
  tableCell: {
    padding: 5,
  },
});

const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Invoice Header */}
      <View style={styles.section}>
        <Text style={styles.header}>Tax Invoice/Bill of Supply/Cash Memo</Text>
        <Text style={styles.text}>Invoice No: {invoiceData.invoiceNo}</Text>
        <Text style={styles.text}>Date: {invoiceData.date}</Text>
        <Text style={styles.text}>Order ID: {invoiceData.orderId}</Text>
      </View>

      {/* Seller and Buyer Information */}
      <View style={styles.section}>
        <Text style={styles.header}>Sold By</Text>
        <Text style={styles.text}>{invoiceData.seller.name}</Text>
        <Text style={styles.text}>Address: {invoiceData.seller.address}</Text>
        <Text style={styles.text}>GST: {invoiceData.seller.gst}</Text>

        <Text style={styles.header}>Sold To</Text>
        <Text style={styles.text}>Patient Name: {invoiceData.buyer.name}</Text>
        <Text style={styles.text}>Address: {invoiceData.buyer.address}</Text>
        <Text style={styles.text}>Contact: {invoiceData.buyer.contact}</Text>
      </View>

      {/* Product Information */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Product Name</Text>
          <Text style={styles.tableCol}>Quantity</Text>
          <Text style={styles.tableCol}>MRP</Text>
          <Text style={styles.tableCol}>Discount</Text>
          <Text style={styles.tableCol}>Total Amount</Text>
        </View>
        {invoiceData.products.map((product, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{product.name}</Text>
            <Text style={styles.tableCol}>{product.qty}</Text>
            <Text style={styles.tableCol}>{product.mrp}</Text>
            <Text style={styles.tableCol}>{product.discount}</Text>
            <Text style={styles.tableCol}>{product.total}</Text>
          </View>
        ))}
      </View>

      {/* Total Amount */}
      <View style={styles.section}>
        <Text style={styles.text}>Gross Amount: ₹{invoiceData.grossAmount}</Text>
        <Text style={styles.text}>Discount Amount: ₹{invoiceData.discountAmount}</Text>
        <Text style={styles.text}>Payable Amount: ₹{invoiceData.payableAmount}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
