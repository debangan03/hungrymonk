import mongoose from "mongoose";

const waiter_credentials = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
    },
    restaurant_id: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.waiter_credentials || mongoose.model("waiter_credentials", waiter_credentials);
