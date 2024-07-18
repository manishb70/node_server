

const asyncHandler = (requsetHandler) => {
    
    return (req, res, next) => {
        Promise.resolve(requsetHandler(req, res, next)).catch((err) => {
            next(err)
        })
    }

}




const asyncHandler2 = (fn) => async (req, res, next) => {

    try {

        await fn(req, res, next)

    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: error.message
        })


    }


}






















export { asyncHandler }