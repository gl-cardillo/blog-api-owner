const Post = require('../models/post');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const { body, validationResult } = require('express-validator');

//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    req.fileValidationError = 'Forbidden extension';
    return cb(null, false, req.fileValidationError);
  },
}).single('image');

exports.postGet = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ msg: 'posts not found' });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return json(err);
  }
};

exports.postPublishedGet = async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true }).sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ msg: 'posts not found' });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return json(err);
  }
};

exports.postUnpublishedGet = async (req, res, next) => {
  try {
    const posts = await Post.find({ published: false }).sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ msg: 'posts not found' });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return json(err);
  }
};

exports.postGetById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    return res.status(200).json(post);
  } catch (err) {
    return json(err);
  }
};

exports.postCreate = [
  upload,
  body('title')
    .trim()
    .isLength(3)
    .withMessage('Title must be at least 3 character')
    .escape(),
  body('text')
    .trim()
    .isLength(5)
    .withMessage('Text must be at least 5 character')
    .escape(),
  async (req, res, next) => {
    if (req.fileValidationError) {
      return res.status(400).json({ msg: 'please apload .jpg, .jpeg or png' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const post = await new Post({
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
      date: Date.now(),
      date_update: null,
      img: req.file?.path,
    });

    if (!req.file) post.img = '';
    post.save((err) => {
      if (err) {
        return json(err);
      }
      return res.status(200).json({ msg: 'post added' });
    });
  },
];

exports.postUpdate = [
  upload,
  body('title')
    .trim()
    .isLength(3)
    .withMessage('Title must be at least 3 character')
    .escape(),
  body('text')
    .trim()
    .isLength(5)
    .withMessage('Text must be at least 5 character')
    .escape(),
  async (req, res, next) => {
    if (req.fileValidationError) {
      return res.status(400).json({ msg: 'please apload .jpg, .jpeg or png' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const post = await new Post({
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
      img: req.file?.path,
      _id: req.body.id,
    });

    if (!req.file) post.img = '';
    Post.findByIdAndUpdate(req.body.id, post, {}, function (err) {
      if (err) {
        return json(err);
      }
      return res.status(200).json({ msg: 'post added' });
    });
  },
];

exports.postPublish = async (req, res, next) => {
  Post.findByIdAndUpdate(req.body.id, { published: true }, {}, function (err) {
    if (err) {
      return json(err);
    }
    return res
      .status(200)
      .json({ msg: `post with id ${req.body.id} published` });
  });
};

exports.postUnpublish = async (req, res, next) => {
  Post.findByIdAndUpdate(req.body.id, { published: false }, function (err) {
    if (err) {
      return json(err);
    }
    return res
      .status(200)
      .json({ msg: `post with id ${req.body.id} unpublished` });
  });
};

exports.postDelete = async (req, res, next) => {
  Post.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      return json(err);
    }
    fs.unlink(req.body.img, (err) => {
      if (err) console.log(err);
      console.log(req.body.img, 'was deleted');
    });
    return res.status(200).json({ msg: `post with id ${req.body.id} deleted` });
  });
};
