import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  preferences: {
    channels: { type: [String], default: ['in_app'] },
    mute: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);