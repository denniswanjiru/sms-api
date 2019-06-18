import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true }
});

export default mongoose.model('Request', requestSchema);
