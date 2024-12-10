const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
        message:{
            text:{
                type:String,
                required:false,
            },
            image:{
                type:String,
                required:false
            }
        },
        users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    },  
    {
        timestamps:true,
    }
)


module.exports = mongoose.model("Messages", messageSchema)