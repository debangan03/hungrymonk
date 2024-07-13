import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        customer_id,
        order_id,
        restaurant_id,
        table_number,
        order_items,
        total_quantity,
        initial_bill,
        tax,
        total_bill,
      } = req.body;
      const order_status = "new";

      // Check if the restaurant exists
      const restaurant = await RestaurantItems.findOne({restaurant_id });
      if (!restaurant) {
        return res.status(201).json({
          success: false,
          error: "Restaurant not found. Please contact support.",
        });
      }

      // Check if there's an existing order for the table with status 'new'
      const existingOrder = await Orders.findOne({ table_number, restaurant_id});
      if (existingOrder) {
        return res.status(201).json({
          success: false,
          error: "This table has an existing order. Please shift to another table or contact the waiter.",
        });
      }

      // Save OrderFoodItems and collect their IDs
      console.log()
      const orderFoodItemsPromises = order_items.map(async (item) => {
        const orderFoodItems = await Promise.all(item.items.map(async (foodItem) => {
          const newOrderFoodItem = new OrderFoodItems({
            food: foodItem._id,
            quantity: foodItem.quantity,
          });
          return await newOrderFoodItem.save();
        }));
        return orderFoodItems.map(orderFoodItem => orderFoodItem._id);
      });

      const savedOrderFoodItemsArray = await Promise.all(orderFoodItemsPromises);

      // Save SingleOrders using the saved OrderFoodItems IDs
      const singleOrderPromises = order_items.map(async (item, index) => {
        const newSingleOrder = new SingleOrders({
          items: savedOrderFoodItemsArray[index],
          notes: item.notes,
          item_total: item.item_total,
          charges: item.charges,
          total_price: item.total_price,
          estimated_time: item.estimated_time,
          status: item.status,
        });
        return await newSingleOrder.save();
      });

      const savedSingleOrders = await Promise.all(singleOrderPromises);

      // Create a new order
      const newOrder = new Orders({
        customer_id,
        order_id,
        restaurant_id,
        table_number,
        order_items: savedSingleOrders.map(order => order._id),
        total_quantity,
        initial_bill,
        tax,
        total_bill,
        order_status,
      });

      const savedOrder = await newOrder.save();
      res.status(200).json({ success: true, data: savedOrder });

    } catch (error) {
      console.error(error);
      res.status(201).json({
        success: false,
        error: "We are facing some technical issues. Please try again later or order in-person directly from the waiter.",
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
