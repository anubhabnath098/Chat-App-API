
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async(req, res, next) => {
    try{
        const {username, email, password}  = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck)
            return res.json({msg:"Username already used", status:false})
        const emailCheck = await User.findOne({msg:"Email already used", status: false})
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password:hashedPassword
        });
        delete user.password;
        return res.json({status:true, user});
    }
    catch(err){
        next(err)
    }

}

module.exports.login=async(req, res, next) =>{
    try{
        console.log(req)
        const {username, password} = req.body;
        const user = await User.findOne({username})
        
        if(user){
            const passwordCheck = await bcrypt.compare(password, user.password)
            if(passwordCheck){
                res.json({status:true, user});
                navigate("/");
            }
            else{
                res.json({msg:"Wrong password", status:false});
            }
        }
        else{
            res.json({msg:"Username does not exist", status:false});
        }
    }
    catch(err){
        next(err);
    }
}

module.exports.setAvatar=async(req, res, next) =>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet : true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarImageSet, image:userData})


    }
    catch(ex){
        next(ex)
    }

}


module.exports.getAllUsers=async(req, res, next) =>{
try{
    const users = await User.find({_id:{$ne: req.params.id}}).select([
        "email", "username", "avatarImage", "_id",
    ])
    return res.json(users);
}
catch(ex){
    next(ex)
}

}
