import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
   image:String
  }
);

export default mongoose.model("Images", imagesSchema);