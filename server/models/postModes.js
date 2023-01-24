import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: string,
        required: true
    },
    desc: {
        type: string,
        required: true
    },
    imgUrl: {
        type: string,
        required: true
    },
    postUrl: {
        type: string,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }

}, { timestamps: true })

export default mongoose.model("Post", postSchema)