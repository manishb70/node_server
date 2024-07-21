import { response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileUploadCloudinary } from "../utils/cloudinary.js";







const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validation not empty
    //check is user already
    //check for images
    //check for avatar
    //upload them to cloudiniary , user
    //create user object - create  entry in db
    //remove password and refresh token field from response
    //check for user creation
    //retrun res

    // res.status(200).json({
    //     message: "success"
    // })


    const { username, password, email, fullName } = req.body


    if ([username, password, email, fullName].some((field) =>
        field?.trim() == "")) {

        console.log("Plese provide all data");
        throw new ApiError(400, "All fields are mansatory")
    }

    const existUer = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (existUer) {
        throw new ApiError(409, "the is already exist")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path
console.log(req.files?.avatar[0]?.path);
    const covereImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Aavatar files is required")
    }

    const avatar = await fileUploadCloudinary(avatarLocalPath)
    const coverImage = await fileUploadCloudinary(covereImageLocalPath)


    if (!avatar) {
        throw new ApiError(400, "Avatar image is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password:await password

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registring the user")
    }

console.log(createdUser);

    return  res.status(201).json(
        new ApiResponse(200, createdUser, "User registred successfully",)
     )
    //  return  res.status(201).json(createdUser)




    // if(!req.body) throw new ApiError(200,"You have not provided user data       ")

    // res.redirect("http://127.0.0.1:5500/forhtmlbackendcheck.html")


})





















const userLogin = asyncHandler(async (req, res) => {
    res.status(200).json({
        code: 200,
        message: "success"
    })
})


export { registerUser, userLogin }