import conndb from "../../../middleware/mongoose";
import Waiter_credentials from "../../../models/Waiter_credentials";


const handler=async(req,res)=>{
    try{
        if(req.method=="POST"){
            const {restaurant_id}=req.body;
            const waiters=await Waiter_credentials.find({restaurant_id});
            if(waiters){
                res.status(200).json({success:true,data:waiters})
            }
            else{
                res.status(201).json({success:false,error:"No waiters found for this restaurant"})
            }
        }
        else{
            res.status(201).json({success:false,error:"Error in method"})
        }
    }
    catch(error){
        res.status(201).json({success:false,error:"Error"})
    }
}
export default conndb(handler);