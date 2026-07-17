

export const validateRequest = (schema) => {
    return(req,res,next)=>{
        const result = schema.safeParse(req.body)//verifica daca body da match la schema
        if(!result.success){
            const errorMessages=result.error.errors.map((err)=>err.message)
            const error=errorMessages.join(",")
            return res.status(400).json({message:error})
        }
        next()
    }
}


//export to watchlist Routes