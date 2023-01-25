import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({
            name,
            email,
            password: hash
        })
        await newUser.save()
        res.status(200).json("User has been created")
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found"))
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Invalid credential"))
        const token = jwt.sign({ id: user._id }, process.env.JWT)

        const { password, ...others } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        next(err)
    }
}
