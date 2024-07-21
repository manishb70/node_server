import { Router } from "express";
import { registerUser, userLogin } from "../controllers/user.controller.js";
import {upload} from "../middlware/multer.middleware.js";


const router = Router()






router.route("/register",upload).post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)




router.route("/login").post(userLogin)



export default router