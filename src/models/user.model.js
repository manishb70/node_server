import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";




const userModelSchema = new Schema({

    watchhistory: {
        type: [
            Schema.Types.ObjectId
        ],
        ref: "video",
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true

    },
    fullName: {
        type: String,
        require: true,
        trim: true
    },
    avatar: {
        type: String,
        require: true,
        trim: true
    },
    coverImage: {
        type: String,

    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }




}, { timestamps: true })

userModelSchema.plugin(mongooseAggregatePaginate);

  userModelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

// userModelSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next(); // if password is not modified, proceed to next middleware
//     try {
//         this.password = await bcrypt.hash(this.password, 10); // hash the password with a salt round of 10
//         next();
//     } catch (err) {
//         next(err); // handle errors in hashing
//     }
// });
userModelSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)

    } catch (error) {
        console.error(error);
    }
}

userModelSchema.methods.genreateAccessToken = function () {

    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        password: this.password
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        })


}

export const User = mongoose.model("User", userModelSchema);
