import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    followers: {
        type: Number,
        default: 0
    },
    followerUsers: {
        type: [String]
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)