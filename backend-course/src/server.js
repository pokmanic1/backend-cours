import express from 'express'


const app=express()



const PORT=5001


app.listen(PORT,()=>[
    console.log("server is runing on port-",PORT)
])