const messageModel = require("../models/messageModel")


module.exports.addMessage=async(req, res, next) =>{
    try{
        const {from, to, message, image} = req.body;
        //console.log(message, image);
        const data = await messageModel.create({
            message:{text:message,image:image},
            users:[from, to],
            sender:from,
        })
        if(data) return res.json({msg:"Message added successfully "});
        return res.json({msg:"Failed to add message to database"})
    }
    catch(ex){
        next(ex);
    }
}
module.exports.getAllMessage=async(req, res, next)=>{
    try{
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from, to]
            },
        }).sort({updatedAt:1})
        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString() === from,
                message: {
                    text:msg.message.text,
                    image:msg.message.image
                }
            };
        });
        res.json(projectMessages);

    }
    catch(ex){
        next(ex);
    }
}
