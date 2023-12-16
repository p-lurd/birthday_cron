const joi = require('joi');





const validateUserCreation = async (req, res, next)=>{
    try {
        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            DOB: joi.date().required()
        })
        const valid = await schema.validate(req.body)
        console.log({validError: valid.error})

        if (valid.error){
            const inputValidationError = new Error (valid.error.message);
            inputValidationError.status = 422;
            // throw inputValidationError;
            const errorParam = encodeURIComponent(inputValidationError.message); // Encode the error message
            return res.redirect(`/?error=${errorParam}`);
        }
        const {username, email, DOB} = req.body
        next();
    } catch (error) {
        next(error)
    }
}








module.exports = {
    validateUserCreation
}