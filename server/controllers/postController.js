import { createError } from "../error.js"
import User from '../models/userModel.js'
import Post from "../models/postModel.js"

export const addPost = async (req, res, next) => {
    const newPost = new Post({ userId: req.user.id, ...req.body })
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (err) {
        next(err)
    }
}
export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            next(createError(404, "Post not found!"))
        }
        if (req.user.id === video.userId) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updatedPost)
        } else {
            next(createError(403, "You can update only your post!"))
        }
    } catch (err) {
        next(err)
    }
}
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            next(createError(404, "Post not found!"))
        }
        if (req.user.id === video.userId) {
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("The post has been delete")
        } else {
            next(createError(403, "You can delete only your post!"))
        }
    } catch (err) {
        next(err)
    }
}
export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.params, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increase")
    } catch (err) {
        next(err)
    }
}

export const trend = async (req, res, next) => {
    try {
        const post = await Post.find().sort({ views: -1 })
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

export const random = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([{ $sample: { size: 5 } }])
        res.status(200).json(posts)
    } catch (err) {
        next(err)
    }
}

export const follow = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const followUser = user.followerUsers

        const list = await Promise.all(
            followUser.map((channelId) => {
                return Post.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}