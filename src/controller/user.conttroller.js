import { asyncWrapper } from "../utils/asyncWrapper";



export const getUserInfo = asyncWrapper(async (req, res) => {
    const user = await userModel.findById(req.body.id)
    return res.status(200).json({
        success: true,
        data: user
    })
})