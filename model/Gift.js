import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    image: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Gift", GiftSchema);
