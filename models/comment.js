const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
    postId: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true } }
);

CommentSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_SHORT);
});

module.exports = mongoose.model('Comment', CommentSchema);
