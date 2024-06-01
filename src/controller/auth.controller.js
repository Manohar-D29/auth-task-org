import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { generateToken, hashedPassword } from "../utils/utilities.js";

export const registerUser = asyncWrapper(async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    //check if the user is already registered
    const userExists = await userModel.findOne({ email: email })
    if (userExists) throw new ApiError(400, "User already exists try with different email")

    //hash the password
    const hashPassword = await hashedPassword(password)

    //create a new user
    const user = await userModel.create({
        first_name,
        last_name,
        email,
        password: hashPassword,
    })
    res.status(200).json({ message: "User created successfully", user: user })

})


export const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body

    //check if the user is already registered
    const userExists = await userModel.findOne({ email: email })
    if (!userExists) throw new ApiError(400, "User does not exists")

    //check if the password is correct
    const isPasswordCorrect = await hashedPassword(password, userExists.password)
    if (!isPasswordCorrect) throw new ApiError(400, "creadentials is incorrect")

    const payload = { id: userExists._id, email: userExists.email }

    //create token
    const tokens = generateToken(payload)

    //save refresh token
    userExists.refreshToken = tokens.refreshToken
    await userExists.save()

    res.status(200).json({ message: "User logged in successfully", token: tokens.acceessToken })

})