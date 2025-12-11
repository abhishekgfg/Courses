import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import courseDetailsRoutes from "./routes/courseDetailsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseStatusRoutes from "./routes/courseStatusRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS")), credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

app.use("/api/admin/courses", courseRoutes);
app.use("/api/admin/courses", courseDetailsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/course-status", courseStatusRoutes); 

app.get("/api/health", (req, res) => res.json({ status: "OK", mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" }));

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
