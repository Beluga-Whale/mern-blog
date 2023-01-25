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

const router = express.Router()

// Update User
router.put("/:id", updateUser)

router.get("/find/:id", getUser)
// 45:41

export default router