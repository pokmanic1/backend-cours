import express from "express";
import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs'
import { Prisma } from "@prisma/client";

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

    res.status(202).json({
        status: "succes",
        data: {
            id: user.id,
            name: name,
            email: email,
        }
    })

}



const login = async (req, res) => {
    const { email, password } = req.boy

        const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" })
    }
}








export { register ,login }