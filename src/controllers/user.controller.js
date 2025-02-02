import { response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileUploadCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import router from "../routes/user.route.js";




const genreateAccessAndRefreshToken = async (userId) => {



    try {
        const user = await User.findById(userId)

        const accessToken = await user.genreateAccessToken()
        const refreshToken = await user.genreateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        console.log("success for JWT tokens");
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while genrating the tokens")
    }


}



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
        password: await password

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registring the user")
    }

    console.log(createdUser);

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registred successfully",)
    )
    //  return  res.status(201).json(createdUser)




    // if(!req.body) throw new ApiError(200,"You have not provided user data       ")

    // res.redirect("http://127.0.0.1:5500/forhtmlbackendcheck.html")


})




const userLogin = asyncHandler(async (req, res) => {
    //get username and password

    const { username, password } = req.body

    // console.log(username + "\n", password);
    // const user = await User.find({username,password})
    const user = await User.findOne({ username })

    // const {password}=user


    if (!user) {
        console.log("user not found");
        // res.json(new ApiError(402,"User not found"))
        res.json(new ApiResponse(404, "null", "user not found"))

    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        // const refreshToken = await user.genreateRefreshToken()
        // user.accessToken = "accessToken"
        throw new ApiError(404, "Your are password in not correct")

    }



    // console.log(refreshToken);
    console.log({
        success: isPasswordValid
    });
    // res.json(user.password)

    const { refreshToken, accessToken } = await genreateAccessAndRefreshToken(user._id)
    // console.log(useTrue);

    console.log('User authorized Success fully');

    // console.log(user.refreshToken);

    // const dt = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    // console.log(dt);
    console.log("refreshToken :", refreshToken);
    console.log("accessToken :", accessToken);

    const options = {
        httpOnly: true,
        secure: true
    }


    await user.save()

    const updatedUserInfo = await User.findById(user.id).select("-password -refreshToken")

    res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).json(
            new ApiResponse(200, updatedUserInfo, "User Verified successfully")

        )



})




const logoutUser = asyncHandler(async (req, res) => {


    //   res.send(req.user._id) 
    //   res.send("req.user ")
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
        {
            new: true
        }
    )


    const options= {
        httpOnly:true,
        secure:true
    }
    return res
    .clearCookie("accessToken",options) 
    .clearCookie("refreshToken",options) 
    .json( new ApiResponse(200,{},"User Logout Successfull"))
})



export { registerUser, userLogin, logoutUser }
