import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";


const handler=async(req,res)=>{
    if(req.method==='POST'){
        try {
        const {_id,order_items,total_bill}=req.body;
        const order_status="updated"
        const order=await Orders.findByIdAndUpdate(_id,{order_items,total_bill,order_status});
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