import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
    default: "/default.jpg",
  },
});

// Building the connection between the code and the cluster
const User = mongoose.model("User", userSchema);
export default User;
