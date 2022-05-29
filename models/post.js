const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    date_update: { type: Date },
    published: { type: Boolean, required: true },
  },
  { toJSON: { virtuals: true } }
);

PostSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT);
});

PostSchema.virtual('date_update_formatted').get(function () {
  return DateTime.fromJSDate(this.date_update).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

module.exports = mongoose.model('Post', PostSchema);
