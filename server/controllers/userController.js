import { createError } from "../error.js"
import User from '../models/userModel.js'
import Post from '../models/postModel.js'

export const updateUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your account"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been delete")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can update only your account"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const follow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { followerUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { followers: 1 }
        })
        res.status(200).json("Follow Successful")
    } catch (err) {
        next(err)
    }
}
export const unfollow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { followerUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { followers: -1 }
        })
        res.status(200).json("Unfollow Successful")
    } catch (err) {
        next(err)
    }
}
export const like = async (req, res, next) => {
    const id = req.user.id
    const postId = req.params.postId
    try {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The video has been like")
    } catch (err) {
        next(err)
    }
}
export const dislike = async (req, res, next) => {
    const id = req.user.id
    const postId = req.params.postId
    try {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been dislike")
    } catch (err) {
        next(err)
    }
}
