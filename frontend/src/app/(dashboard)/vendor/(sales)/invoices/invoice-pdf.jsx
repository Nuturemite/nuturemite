"use client";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ invoiceData }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20,
    },
    section: {
      marginBottom: 10,
    },
    table: {
      display: "table",
      width: "100%", // Ensure table width is 100% of page
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1, // Add border to rows for better separation
      borderBottomStyle: "solid",
    },
    tableCol: {
      flex: 1, // Distribute space equally among columns
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      minWidth: 100, // Set a minimum width for better visibility
    },
    tableCell: {
      textAlign: "left",
      fontSize: 12,
    },
    total: {
      textAlign: "right",
      fontSize: 18,
      marginTop: 10,
    },
    shippingAddress: {
      marginTop: 20,
      fontSize: 12,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>
        <View style={styles.section}>
          <Text>
            Customer: {invoiceData.shippingAddress.fname + " " + invoiceData.shippingAddress.lname}
          </Text>
          <Text>Date: {new Date(invoiceData.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol, flex: 9 }}>
              <Text style={styles.tableCell}>Item</Text>
            </View>
            <View style={{ ...styles.tableCol, flex: 1 }}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={{ ...styles.tableCol, flex: 1 }}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={{ ...styles.tableCol, flex: 1 }}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {invoiceData.orderItems.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={{ ...styles.tableCol, flex: 9 }}>
                <Text style={styles.tableCell}>{item.product.name}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 1 }}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 1 }}>
                <Text style={styles.tableCell}>{item.unitPrice}</Text>
              </View>
              <View style={{ ...styles.tableCol, flex: 1 }}>
                <Text style={styles.tableCell}>{item.totalPrice}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total: {invoiceData.total}</Text>
        <View style={styles.shippingAddress}>
          <Text>Shipping Address:</Text>
          <Text>
            {invoiceData.shippingAddress.fname} {invoiceData.shippingAddress.lname}
          </Text>
          <Text>{invoiceData.shippingAddress.address}</Text>
          <Text>
            {invoiceData.shippingAddress.city}, {invoiceData.shippingAddress.state}{" "}
            {invoiceData.shippingAddress.zipcode}
          </Text>
          <Text>{invoiceData.shippingAddress.country}</Text>
          <Text>Email: {invoiceData.shippingAddress.email}</Text>
          <Text>Phone: {invoiceData.shippingAddress.phone}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
