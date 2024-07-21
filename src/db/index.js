import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




const connectDB = async () => {
    try {

        // const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect("mongodb+srv://manishb79:db123@manish.x5h9k0c.mongodb.net/youtube")
        console.log(`\n MongoDB conneted !! DB HOST ${connectionInstance.connection.host} `);
    } catch (error) {
        console.error("Mongo db connection error ", error)
        process.exit(1)

    }
}


export default connectDB;
