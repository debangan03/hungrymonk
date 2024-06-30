import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import RestaurantItems from "../../../models/RestaurantItems";


const handler=async(req,res)=>{
    if(req.method==='POST'){
        try {
        
        const {customer_id,order_id,restaurant_id,table_number,order_items,initial_bill,tax,total_bill}=req.body;
        const order_status="new"
        const u=await RestaurantItems.find({restaurant_id});
        
        if(u.length>0){
        const u1=new Orders({customer_id,order_id,restaurant_id,table_number,order_items,initial_bill,tax,total_bill,order_status});
        const order=await u1.save();
        res.status(200).json({success:true,data:order});
        }
        else
        {
            res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"});
        }
        } catch (e) {
            res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"});
        }
    }
    else{
        res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"})
    }
}
export default conndb(handler);