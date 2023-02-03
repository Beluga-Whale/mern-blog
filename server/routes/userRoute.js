import express from 'express'
import {
    updateUser,
    deleteUser,
    getUser,
    follow,
    unfollow,
    like,
    dislike
} from '../controllers/userController.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// Update User
router.put("/:id", verifyToken, updateUser)

// Delete User
router.delete("/:id", verifyToken, deleteUser)

//Get a user
router.get('/find/:id', getUser)

//Follow
router.put('/follow/:id', verifyToken, follow)

//UnFollow
router.put('/unfollow/:id', verifyToken, unfollow)

//Like a post
router.put('/like/:postId', verifyToken, like)

//Dislike a post
router.put('/dislike/:postId', verifyToken, dislike)


export default router