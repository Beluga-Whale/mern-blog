import express from 'express'
import { addPost, deletePost, getPost, updatePost, addView, random, trend, follow, getByTags, search, myPost } from '../controllers/postController.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

//Create new post
router.post('/', verifyToken, addPost)

//Update post
router.put('/:id', verifyToken, updatePost)

//Delete post
router.delete('/:id', verifyToken, deletePost)

//Get post 
router.get('/find/:id', getPost)

//Get post by Id user
router.get("/findmyPost/:id", verifyToken, myPost)

//Put View
router.put('/view/:id', addView)

//Get Trend
router.get('/trend', trend)

//Get random
router.get('/random', random)

//Put follow
router.get('/follow', verifyToken, follow)

//Get tags
router.get('/tags', getByTags)

//get Search
router.get('/search', search)

export default router
