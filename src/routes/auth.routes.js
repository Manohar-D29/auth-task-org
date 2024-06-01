import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../utils/validations.js";

const authRouter = Router()

authRouter.route('/register').post(validateReqBody(userRegisterSchema), registerUser)
authRouter.route('/login').post(validateReqBody(userLoginSchema), loginUser)

export default authRouter;