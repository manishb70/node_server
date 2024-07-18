    import { asyncHandler } from "../utils/asyncHandler.js";
    






    const registerUser = asyncHandler(async (req,res)=>{


       
        res.status(920).json({
            message:"regstration success"
        })


    })



    export {registerUser}