export const asyncWrapper = (fun) => (req, res, next) => {
    return Promise.resolve(fun(req, res, next)).catch((err) => next(err))
}
