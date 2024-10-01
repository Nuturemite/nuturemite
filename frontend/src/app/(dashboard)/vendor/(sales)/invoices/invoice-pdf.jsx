"use client";
import React from "react";
import { Page, Text, View, Document, StyleSheet, Tspan } from "@react-pdf/renderer";

const Invoice = ({ invoiceData }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
      textTransform: "uppercase",
    },
    invoiceDetails: {
      fontSize: 12,
      marginBottom: 15,
    },
    soldBySection: {
      fontSize: 12,
      marginBottom: 10,
    },
    buyerSection: {
      fontSize: 12,
      marginBottom: 20,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
    tableCol: {
      flex: 1,
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      minWidth: 100,
    },
    tableCell: {
      fontSize: 10,
    },
    summary: {
      marginTop: 20,
      fontSize: 12,
    },
    total: {
      textAlign: "right",
      fontSize: 16,
      marginTop: 10,
      fontWeight: "bold",
    },
    footer: {
      fontSize: 10,
      marginTop: 20,
      textAlign: "center",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Tax Invoice</Text>

        {/* Invoice and Order Information */}
        <View style={styles.invoiceDetails}>
          {/* <Text>Invoice No.: C026882400000043</Text> */}
          <Text>Date: {new Date(invoiceData.createdAt).toLocaleDateString()}</Text>
          <Text>Order ID: {invoiceData._id}</Text>
        </View>

        {/* Seller Information */}
        <View style={styles.soldBySection}>
          <Text>Sold By</Text>
          <Text>Nuturemite</Text>
          <Text>FSSAI License No: 13622999000359</Text>
          <Text>GST: 36AAUFN0688F1ZS</Text>
          <Text>
            Address: 5-36-226/Nr 2nd Floor, Balnagar Prashanth Nagar Kukatpallyt, Hyderabad,
            Telangana, 500072
          </Text>
        </View>

        {/* Buyer Information */}
        <View style={styles.buyerSection}>
          <Text>Sold By</Text>
          <Text>
            {invoiceData.shippingAddress.fname} {invoiceData.shippingAddress.lname}
          </Text>
          <Text>
            Address: {invoiceData.shippingAddress.address}, {invoiceData.shippingAddress.city},{" "}
            {invoiceData.shippingAddress.state}, {invoiceData.shippingAddress.zipcode}
          </Text>
          <Text>Phone: {invoiceData.shippingAddress.phone}</Text>
        </View>

        {/* Product Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Qty</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>MRP</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Discount</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>

          {invoiceData.orderItems.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.mrp}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.discount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.totalPrice}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total and Summary */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Gross Amount</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Discount Amount</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Bill Amount</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Payable Amount</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₹{invoiceData.subTotal}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₹{invoiceData.discount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₹{invoiceData.subTotal - invoiceData.discount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₹{Math.round(invoiceData.total)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>All disputes subject to Hyderabad jurisdiction</Text>
      </Page>
    </Document>
  );
};

export default Invoice;
