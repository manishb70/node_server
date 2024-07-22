import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";



export const verifyJWT = asyncHandler(async (req, _, next) => {

    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if(!accessToken){ throw new ApiError(401, "Token is not valid !!Please login!!")}
    
    const DecodedUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if (!DecodedUser) {
        throw new ApiError(401, "Invalid Token")
    }

    const user = await User.findById(DecodedUser._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401, "Token is not valid !!Please login!!")

    }
    req.user = user;

    next()

})
