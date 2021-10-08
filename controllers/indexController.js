import Comment from '../models/comment.js';

export const indexController = async (req, res) => {
  const comments = await Comment.find().sort({ date: -1 }).limit(20);
  res.status(200).render('index', { comments });
};
