import mongoose from 'mongoose';

const postMessage = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  likeCount: {
    type: Number,
    default: 0
  }
});

const PostMessage = mongoose.model('PostMessage', postMessage);

export default PostMessage;