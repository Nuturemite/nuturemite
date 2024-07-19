import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import brandRoutes from "./routes/brand.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import vendorProductRoutes from "./routes/vendorProduct.route.js";
import cartRoutes from "./routes/cart.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import paymentRoutes from "./routes/payment.route.js";
import { stripePaymentListener } from "./controllers/payment.controller.js";
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripePaymentListener);

app.use(express.json({ limit: "50mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/vendor-products", vendorProductRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

// Routes

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const port = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch(() => {
    console.log("MongoDb connection failed");
  });
