import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});





const fileUploadCloudinary = async (localFilePath) => {



    try {
        if (!localFilePath) return null
        const uploadResult = await cloudinary.uploader.upload(localFilePath, { public_id: 'shoes', resource_type: "auto" })
        console.log("file upload Success");
        fs.unlinkSync(localFilePath)

        return uploadResult;

    } catch (error) {
        console.log("Having some kind of eerror");

    }
}







export { fileUploadCloudinary, cloudinary }





