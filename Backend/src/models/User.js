import { genSaltSync, hashSync, compareSync } from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverconfig.js";
import Cart from "./Cart.js";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: {
      type: [Schema.Types.Mixed],
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
    },
    name: {
      type: String,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.cart) {
      const cart = await Cart.create({ products: [], user: this._id });
      this.cart = cart._id;
    }
    next();
  } catch (error) {
    console.error("Error in creating cart:", error);
    next(error);
  }
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const SALT = genSaltSync(10);
    this.password = hashSync(this.password, SALT);
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  const SALT = genSaltSync(10);
  this.password = hashSync(password, SALT);
  return compareSync(password, this.password);
};

UserSchema.methods.resetPassword = async function (password) {
  this.password = password;
  await this.save();
};

UserSchema.methods.genJwt = function () {
  const payload = {
    email: this.email,
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
