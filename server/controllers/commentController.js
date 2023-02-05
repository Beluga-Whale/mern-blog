import { createError } from '../error.js'
import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })
    try {
        const saveComment = await newComment.save()
        res.status(200).json(saveComment)
    } catch (err) {
        next(err)
    }
}
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const post = await Post.findById(req.params.id)
        if (req.user.id === comment.userId || req.user.id === post.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been delete")
        } else {
            return next(createError(403, "You can delete only you comment"))
        }
    } catch (err) {
        next(err)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}

