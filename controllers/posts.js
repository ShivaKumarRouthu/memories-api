import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(440).json({messeage: error.messeage});
  }
}

export const createPost = async (req, res) => {
  const newPost = req.body;
  const postMessage = new PostMessage({...newPost, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await postMessage.save();
    res.status(201).json(postMessage);
  } catch (error) {
    res.status(440).json({messeage: error.messeage});
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { creator, title, message, tags, selectedFile } = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(440).send('No Posts Available');
  
  const updatePost = { creator, title, message, tags, selectedFile, id:_id };
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, updatePost, {new: true });
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(440).send('No Posts Available');
  await PostMessage.findOneAndDelete({ _id: id});
  res.json({ message: 'Post Deleted' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  if(!req.userId) return res.json({ message: 'Unauthorized user' });
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(440).send('No Posts Available');
  const post = await PostMessage.findById(id);
  const isAlreadyLiked = post.likes.findIndex((likeId) => likeId === req.userId);
  if(isAlreadyLiked === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((likeId) => likeId !== req.userId);
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
}

