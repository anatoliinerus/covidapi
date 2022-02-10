import mongoose from 'mongoose';

const savedReqSchema = new mongoose.Schema({
  savedRequest: {
    type: Object,
    required: true,
    index: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const SavedReq = mongoose.model('SavedReq', savedReqSchema);
export default SavedReq;
