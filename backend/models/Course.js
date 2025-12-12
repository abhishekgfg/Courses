import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const lessonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Video", "Quiz"], default: "Video" },
  duration: { type: String },
  thumbnail: { type: String }, 
  youtubeUrl: { type: String }, // store full iframe src URL or normal URL
  points: [String],
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema],
  isLocked: { type: Boolean, default: true },
});

const courseSchema = new mongoose.Schema(
  {
    moduleName: { type: String, required: true },
    disease: { type: String },
    type: { type: String, enum: ["Intro", "Deep-dive", "Protocols"] },
    access: { type: String, enum: ["Free", "Paid","Locked"] },
    courseTitle: { type: String, required: true },
    courseDescription: { type: String },
    totalModules: { type: Number },
    totalTime: { type: String },
    youWillLearn: [String],
    bottomFieldText: { type: String },
    thumbnail: { type: String }, // Course thumbnail filename
    modules: [moduleSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
