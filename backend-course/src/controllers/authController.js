import express from "express";
import { prisma } from '../config/db.js'


const register = async (req, res) => {
    const { name, email, password } = req.body
    //firste check is he exist
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    });

    if(userExist){
        return res.status(400).json({error:"User alredy exist with this email"})
    }
    


}

export { register }