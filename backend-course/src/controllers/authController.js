import express from "express";
import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs'
import { Prisma } from "@prisma/client";
import { generateToken } from "../utils/generateToken.js";



const register = async (req, res) => {
    const { name, email, password } = req.body
    //firste check is he exist
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    });

    if (userExist) {
        return res.status(400).json({ error: "User alredy exist with this email" })
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    //create user

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    
    //token
    const token=generateToken(user.id)

    res.status(202).json({
        status: "succes",
        data: {
            id: user.id,
            name: name,
            email: email,
        },token
    })

}



const login = async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPassworValid = await bcrypt.compare(password, user.password);
    if (!isPassworValid) {
        return res.status(400).json({ error: "User alredy exist with this email" })
    }


    //token
    const token=generateToken(user.id,res)

    res.status(202).json({
        status: "succes",
        data: {
            id: user.id,
            email: email,
        },
        token,
    })
}


const logout= async (req, res) => {
    //res cookie ia jwt si il seteaza cu nimic
    res.cookie("jwt","",{
        httpOnly:true ,
        expires:new Date(0)//expire in 0 adica acum cand functia e apelata
    })

    res.status(200).json({
        status: "succes",
        message:"Logged out successfully",
    });
}








export { register, login ,logout}