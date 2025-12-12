import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";
import CourseStatus from "../models/CourseStatusModel.js";
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
    });
  
    await CourseStatus.create({
      userId: user._id,
      // courseId: DEFAULT_COURSE_ID,
      status: "Pending"
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user =
      (await User.findOne({ email: identifier })) ||
      (await User.findOne({ phone: identifier }));

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const msg = "If the email exists, a reset link has been sent.";

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: msg });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;

    await sendEmail({
      to: email,
      subject: "Reset Your Password | Manovaidya",
      text: `Hello ${user.name},

You recently requested to reset your password for your account. Click the link below to set a new password:

${resetUrl}

If you did not request a password reset, please ignore this email. This link will expire in 1 hour.

Thanks,
Manovaidya Team
`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #1f2937;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You recently requested to reset your password for your account. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              margin: 10px 0;
              background-color: #4f46e5;
              color: #fff;
              font-weight: bold;
              text-decoration: none;
              border-radius: 5px;
          ">Reset Password</a>
          <p>If you did not request this, please ignore this email. This link will expire in 1 hour.</p>
          <p>Thanks,<br/>Manovaidya Team</p>
        </div>
      `,
    });

    res.json({ message: msg });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const newHash = await bcrypt.hash(password, 10);

    user.password = newHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users (Admin only)
// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // include password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
