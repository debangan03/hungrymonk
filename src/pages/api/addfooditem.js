import conndb from "../../../middleware/mongoose";
import RestaurantItems from "../../../models/RestaurantItems";

const handler=async(req,res)=>{
    if(req.method=="POST"){
        try{
            console.log(req.body);
        const {restaurant_id,restaurant_name,food_items}=req.body;
        console.log(restaurant_id,restaurant_name,food_items)
        const u=new RestaurantItems({restaurant_id,restaurant_name,food_items});
        const u1=await u.save();
        res.status(200).json({success:true,data:u1});
    }
        catch(e){
            res.status(201).json({success:false})
        }

    }
}
export default conndb(handler);