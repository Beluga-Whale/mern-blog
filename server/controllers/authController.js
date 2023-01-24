import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).json("User has been created")
    } catch (err) {
        next(err)
    }
}

// 33:52 minute youtube