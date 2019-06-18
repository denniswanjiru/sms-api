import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: { type: String, required: true },
  status: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true }
});

export default mongoose.model('message', messageSchema);
