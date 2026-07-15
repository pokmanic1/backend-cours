import jwt from 'jsonwebtoken'

export const generateToken=(userId ,res)=>{
    const payload={id:userId};

    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN ||"7d",
    })

    res.cookie('jwt',token,{
        httpOnly: true, //sa fie doar acesat debrowser nu de avascript sau alte coduri
        secure:process.nextTick.NODE_ENV==='production' ,//securizat doar in prodtie adica pus pe internet
        sameSite:"strict", //opreste ca siteul sa trimita acet cooki incontinu
        maxAge:(1000*60*60*24)*7 //in milisecunde
    })
    return token
}