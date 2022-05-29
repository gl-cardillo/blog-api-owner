const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.commentsGet = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.body.id });
    if (!comments) {
      return res.status(404).json({ error: 'comments not found' });
    }
    return res.status(200).json({ comments });
  } catch (error) {
    return json(err);
  }
};

exports.commentsCreate = [
  body('text')
    .trim()
    .isLength(5)
    .withMessage('Comment must be at least five character.')
    .escape(),
  body('username')
    .isLength(3)
    .withMessage('Username must be at least 3 character.')
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const comment = await new Comment({
      text: req.body.text,
      username: req.body.username,
      postId: req.body.postId,
    });

    comment.save((err) => {
      if (err) {
        return json(err);
      }
    });
    return res.status(200).json({ msg: 'comment added' });
  },
];

exports.commentDelete = async (req, res, next) => {
  console.log(req.body.id)
  try {
    await Comment.findByIdAndDelete(req.body.id);
    return res
      .status(200)
      .json({ msg: `comment with id ${req.body.id} deleted` });
  } catch (err) {
    return json(err);
  }
};

exports.commentsPostDelete = async (req, res, next) => {
  try {
    await Comment.deleteMany({ postId: req.body.id });
    return res
      .status(200)
      .json({ msg: `Comments from the post with id ${req.body.id}` });
  } catch (error) {
    return json(err);
  }
};
