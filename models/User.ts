import mongoose,{Schema,models} from "mongoose";

const UserSchema = new Schema(
    {
        name : String,
        email:{
            type: String,
            rquired: true,
            unique: true,
        },
        imgae: String,
    },
    {timestamps : true}
)

export default models.User || mongoose.model("User", UserSchema)