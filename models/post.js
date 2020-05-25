const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const PostSchema = Schema({
  title: String,
  url: {
    type: String,
    unique: true,
  },
  description: String,
  date: Date,
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
