import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { order_id} = req.body;
      const order=await Orders.findOneAndUpdate({order_id},{order_status:"waitingforbill"})
      if (order) {
        res.status(200).json({ success: true});
      } else {
        res.status(201).json({ success: false});
      }
    } catch (e) {
      console.error(e);
      res.status(201).json({
        success: false,
        error:
          "We are facing some technical issue currently, you can however order in-person directly to the waiter",
      });
    }
  } else {
    res.status(201).json({
      success: false,
      error: "Method not allowed. Please use POST method.",
    });
  }
};

export default conndb(handler);
