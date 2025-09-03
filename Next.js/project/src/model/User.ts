import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode?: string; // code for verification
  expiryVerifyCode?: Date; // expiry time for the code
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isVerified: { type: Boolean, default: true },
    verifyCode: { type: String },
    expiryVerifyCode: { type: Date },
  },
  { timestamps: true }
);

const User =
  (models.User as mongoose.Model<IUser>) || model<IUser>("User", userSchema);
export default User;
