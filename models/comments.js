const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");


const CommentSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore : {type: Number, default: 0},
  positive: { type: Boolean },
});


// Always populate the author field
CommentSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('find', Populate('comments'))
    .pre('find', Populate('downVotes'))
    .pre('find', Populate('upVotes'))
    
module.exports = mongoose.model("Comment", CommentSchema);