import { Router } from "express";
import { signInUser, signUpUser } from "../controller/auth.controller.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../utils/validations.js";

const authRouter = Router()

authRouter.route('/sign-up').post(validateReqBody(userRegisterSchema), signUpUser)
authRouter.route('/sign-in').post(validateReqBody(userLoginSchema), signInUser)

export default authRouter;