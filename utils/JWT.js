const {verify}=require("jsonwebtoken")

const validateToken=(req,res,next)=>{
    
    const accessToken=req.header("acessToken")

    console.log(accessToken)

    if(!accessToken){
        res.json({Message:"user not authenticated"})
    }else{
            verify(accessToken,"azerty123",(err,d)=>{
                if(err){
                    return res.json({Message:"Authentication Error"})
                }else{
                    
                     req.email=d.email
                     
                     next()
                }
            })
    }
}

module.exports={
    validateToken
}
