import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload) => {
    const acceessToken = jwt.sign(payload, process.env.JWT_SECRET)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET)
    return { acceessToken, refreshToken }
}

// export const generateRefreshToken = () => {
//     const refreshToken = uuidv4().toString()
//     const expireTime = Date.now() + 

// }

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}