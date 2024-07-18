import mongoose, { Schema } from "mongoose";



const videoModelSchema  = new Schema({


            videoFile:{
                type:String,
                require:true
            },
            thumbnail:{
              type:String,
              require:true

            },
            owner:{
                type:Schema.Types.ObjectId,
                ref:"User",
                require:true
            } ,
            title:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:tru
            },
            duration:{
                type:Number,
                require:true
            },
            views:{
                type:Number,
                default:0
            },
            isPublished:{
                type:Boolean,
                require:true,
                default:true
            }


},{timestamps:true})




 
export const Video = mongoose.model("Video",videoModelSchema)