const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    Name: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categories: {
        type: String,
        required: true 
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    views: { 
        type: Number,
        default: 0
    }
});

PostSchema.index({
    title: 'text',
    description: 'text',
    categories: 'text',
    Name: 'text'
});

PostSchema.index({ createdAt: -1 });

const Post = mongoose.model('Post', PostSchema);


module.exports = Post;
