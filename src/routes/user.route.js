import { Router } from "express";
import { logoutUser, registerUser, userLogin } from "../controllers/user.controller.js";
import { upload } from "../middlware/multer.middleware.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {verifyJWT} from "../middlware/authUser.middleware.js";


const router = Router()






router.route("/register", upload).post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)



router.route("/login").post(userLogin)




router.route("/getuser").get(async (req, res) => {

//    const  user_detials = await User.findOne({   username:req.params.id  })
// //    const  user_detials = await User.find()

// if(!user_detials) {
// //    res.send("404 User not found ")
//      throw new ApiResponse(401,"APi error")
//     // console.log('Having some error');
// }

const options = {
    httpOnly:true,
    secure:true
}

console.log("!----------------Working-----------------!");
    // res.json({
    //     code:"success"
    // })
    res.cookie("name","manish",options).json({
        success:true
    })

    console.log("!----------------success-----------------!");

})



router.route("/logout").get( verifyJWT,logoutUser)






export default router