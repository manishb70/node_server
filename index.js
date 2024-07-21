import { DB_NAME } from "./src/constants.js";
import express from 'express';
import mongoose, { mongo } from "mongoose";
import connectDB from "./src/db/index.js";
import { cloudinary, fileUploadCloudinary } from "./src/utils/cloudinary.js";
import { upload } from "./src/middlware/multer.middleware.js";
import { app } from "./src/app.js";






connectDB()
.then(() => {
    console.log("connection success");
    app.on("error",(error)=>{
            console.log(error);
            throw error
    })
    app.listen(8800 ||process.env.PORT ,(req,res)=>{
        console.log("server created success!!!!!!!!!");
        console.log(`server started on port ! :${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("\nmongo db connection error 506 \n");
    })
    


    app.get("/",(req,res,next)=>{

        res.send("Welcome to our server")
        
    
    })



        app.post("/upload",upload.single("profileImage"),(req,res)=>{



                    console.log(req.body)
                    console.log(req.file);
                    console.log(req.file.path);
                    
                    fileUploadCloudinary(req.file.path)
                    res.redirect("/")


        })


        // app.post("/user/v1",(req,res,next)=>{

        //     // res..statojson({
        //     //     success:"true",
        //     //     message:"you are work is done"
        //     // })
           
        //     res.status(920).json({
        //         success:"true",
        //         message:"you are success fully created "
                
        //     })
        // })



// const app = express();
// (async () => {
//     try {

//         await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("our application not able to talk to MONGO DB server");
//             throw error
//         })
//         console.log("server started success fully");
//         console.log(`the connection server is : ${mongoose.connection.host}`);
//         app.listen(8000, (req, res) => {
//             console.log(`server started on port : ${process.env.PORT}`)
//         })
//         app.get("/", (req, res) => {
//             res.json(mongoose.connection + "");
//             console.log(mongoose.connection);
//         })
//     } catch (error) {
//         console.error("Error", error);
//         throw error
//     }
// })()

// const up_details  = async (u)=>{
    
    
    
//    const data = await u ploadResult();

//    console.log(data);

// }




// up_details()