import { ApiError } from "../utils/apiError.js";

export const validateReqBody = (schema) => (req, res, next) => {
    if (!Object.keys(req.body).length)
        throw new ApiError(400, "please provide a valid payload..");

    const { error, value } = schema.validate(req.body);

    if (error) throw new ApiError(400, error.details[0].message);
    req.body = value;
    next();
};
