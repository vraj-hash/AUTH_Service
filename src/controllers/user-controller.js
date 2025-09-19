const UserService =  require('../services/user-service');
const { response } = require('express');

const userService = new UserService();

const create = async (req,res)=>{
    try{
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message:'successfully created the user',
            data:response,
            err:{}
        })

    } catch(error){
        console.log(error);
        return res.status(error).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        })

    }
}

module.exports = {
    create
}