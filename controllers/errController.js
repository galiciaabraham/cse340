const errorCont = {}

/* 
Build the error page 
*/
errorCont.errBuilder = async function(req,res,next){
    next({status: 500, message: "Our application guy and our server guy couldn't agree on this one... Sorry!"})
}

module.exports = errorCont
