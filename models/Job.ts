import mongoose , {Schema,models} from "mongoose";

const JobSchema = new Schema(
    {
        companyName: String,
        role: String,
        status:{
            type: String,
            enum:["Applied","Interview","Offer","Rejected"],
            default:"Applied",
        },
        appliedDate: Date,
        userEmail:String,
    },
    {timestamps: true}    
)

export default models.Job || mongoose.model("Job",JobSchema)