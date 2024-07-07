import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler=async(req,res)=>{
    if(req.method=="POST"){
        try{
        const {restaurant_id}=req.body;
        const menu=await RestaurantItems.findOne({restaurant_id}).populate('food_items');
        if(menu){
        res.status(200).json({success:true,data:menu});
        }
        else{
            res.status(201).json({success:false,error:"No menu found for this restaurant"});
        }
    }
        catch(e){
            res.status(201).json({success:false,error:"We are facing some technical issue currently, you can however order in-person directly to the waiter"});
        }

    }
}
export default conndb(handler);