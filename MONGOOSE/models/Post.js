const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    status: {
        type: String, 
        enum: ["Brouillon", "Publié"]
    },
    author: {
        type: mongoose.Types.ObjectId, //? Ici on stocke un objectId (type des ID dans MongoDB)
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', postSchema);