const UserModel = require('../models/user');


const createUser = async (req, res, next)=>{
    try {

        const {username, email, DOB} = req.body
        const existedusername = await UserModel.findOne({email: email});
        if (existedusername){
            const duplicateUserError = new Error("User already exists");
            duplicateUserError.status = 409;
            // throw duplicateUserError;
            const errorParam = encodeURIComponent(duplicateUserError.message); // Encode the error message
            return res.redirect(`/?error=${errorParam}`);
        }
        const user = await UserModel.create({
            username,
            email,
            DOB
        })
        
        const userCreation = new Error("User created successfully");
            userCreation.status = 409;
            // throw userCreation;
            const Param = encodeURIComponent(userCreation.message); // Encode the error message
          return res.status(201).redirect(`/?error=${Param}`);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    createUser
}