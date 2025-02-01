import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    paid: {
      type: Number,
      default: 0,
    },
    verifyed: {
      type: Boolean,
      default: false,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      default: "Member",
      enum: ["Member", "Manager", "Admin"],
    },
    history: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", schema);
export default User;
