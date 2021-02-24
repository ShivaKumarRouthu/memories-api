import mongoose from 'mongoose';

const postMessage = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  likes: {
    type: [String],
    default: []
  }
});

const PostMessage = mongoose.model('PostMessage', postMessage);

export default PostMessage;