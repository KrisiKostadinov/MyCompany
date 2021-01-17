const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({
    title: String,
    content: String,
    company: {
        type: ObjectId,
        ref: 'Company'
    },

    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Post = model('Post', PostSchema);

module.exports = Post;