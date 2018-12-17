import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: String, required: true },
  desc: String,
});

export default mongoose.model('Request', requestSchema);
