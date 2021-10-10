import Comment from '../models/comment.js';
import moment from 'moment'

export const indexGetController = async (req, res) => {
  const comments = await Comment.find().sort({ date: -1 }).limit(20);
  res.status(200).render('index', { comments, moment });
};

export const indexPostController = async (req, res) => {
  if (req.user) {
    try {
      const comment = {
        name: req.user.name,
        date: new Date(),
        text: req.body.text,
      };
      const newComment = new Comment(comment);
      await newComment.save();
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  }
};
