import Comment from '../models/comment.js';
import moment from 'moment';

export const indexGetController = async (req, res, next) => {
  const limit = 20;
  let count = await Comment.count();
  count = Math.ceil(count / 20);
  let page = Math.abs(req.query.page - 1) || 0;
  page = page > count ? count : page;

  if (Math.abs(req.query.page) > count) {
    res.status(404).render('404');
    return;
  }

  const comments = await Comment.find()
    .sort({ date: -1 })
    .limit(limit)
    .skip(page * limit);
  res.status(200).render('index', { comments, moment, page, count });
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

export const indexDeleteController = async (req, res) => {
  if (!req.user.isAdmin) return;
  try {
    await Comment.findByIdAndDelete(req.query.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};
