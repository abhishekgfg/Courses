import mongoose from "mongoose";

const courseDetailsSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: String,
    subtitle: String,
    description: String,

    whatYouWillLearn: [String],

    whoThisIsFor: {
      perfectFor: [String],
      notFor: [String],
    },

    instructor: {
      name: String,
      role: String,
      about: String,
      photoPath: String, // uploaded filename
    },

    keyPoints: [String],        // ✅ add this
    actionSteps: [String],      // ✅ add this

    downloads: [
      {
        name: String,
        filePath: String, // uploaded filename
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CourseDetails", courseDetailsSchema);
