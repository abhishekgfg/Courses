// models/CourseStatusModel.js
import mongoose from "mongoose";

const courseStatusSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Purchased", "Pending", "Not Done"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("CourseStatus", courseStatusSchema);
