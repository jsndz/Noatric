import { genSaltSync } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import JWT_SECRET from '../config/serverConfig.js';
const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
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
  },
  addresses: {
    type: [Schema.Types.Mixed],
  },
  orders: {
    type: [Schema.Types.Mixed],
  },
  name: {
    type: String,
  },
},{ timestamps: true });

UserSchema.pre('save',function(next){
  const user = this;
  const SALT = genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(user.password,SALT);
  user.password = encryptedPassword;
  next();
})

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password,this.password)
}

UserSchema.methods.genJwt = function (user){
  const payload = {
    
    email:user.email
  }
  return jwt.sign(payload,
  'urbanhaven')
}
const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});


const User = mongoose.model("User", UserSchema);
console.log("User",User); 
export default User;
