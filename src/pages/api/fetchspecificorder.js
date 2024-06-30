import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";


const handler=async(req,res)=>{
    if(req.method==='POST'){
        try {
        const {orderId}=req.body;
        const order=await Orders.find({order_id:orderId});
        console.log(order)
        res.status(200).json({success:true,data:order});
        } catch (e) {
            res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"});
        }
    }
    else{
        res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"})
    }
}
export default conndb(handler);