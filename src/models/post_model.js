import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

// create PostModel class from schema

// took bare bones from SA7 poll PostModel
const PostSchema = new Schema({
  title: String,
  tags: String,
  contents: String,
  cover_url: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

// create model class
// does this create a class.. or do I actually have to extend component and such
const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
