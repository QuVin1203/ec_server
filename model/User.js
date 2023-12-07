import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    point: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    purchasedGifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gift" }],
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
