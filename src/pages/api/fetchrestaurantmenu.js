import conndb from "../../../middleware/mongoose";
import RestaurantItems from "../../../models/RestaurantItems";


const handler=async(req,res)=>{
    if(req.method=="POST"){
        try{
        const {restaurant_id}=req.body;
        console.log(req.body)
        console.log(restaurant_id);
        const menu=await RestaurantItems.findOne({restaurant_id});
        console.log(menu)
        res.status(200).json({success:true,data:menu});
    }
        catch(e){
            res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"});
        }

    }
}
export default conndb(handler);