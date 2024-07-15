import conndb from "../../../middleware/mongoose";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";
import CompletedOrders from "../../../models/CompletedOrders";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { customer_id,restaurant_id } = req.body;
      const orders = await CompletedOrders.find({ customer_id,restaurant_id })
        .populate({
          path: 'order_items',
          populate: {
            path: 'items',
            populate: {
              path: 'food',
              model: 'FoodItems'
            }
          }
        });
        //console.log(orders)
        if(orders.length > 0) {
      res.status(200).json({ success: true, data: orders });
        }
        else{
            res.status(201).json({ success: false, message: 'No order found' });
        }
    } catch (e) {
      
      res.status(201).json({
        success: false,
        error: "We are facing some technical issue currently, you can however order in-person directly to the waiter"
      });
    }
  } else {
    res.status(201).json({
      success: false,
      error: "Method not allowed. Please use POST method."
    });
  }
};

export default conndb(handler);
