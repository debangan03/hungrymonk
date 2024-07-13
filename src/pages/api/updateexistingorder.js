import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { order_id,new_total_quantity, new_order_items, new_initial_bill, cgst, sgst } = req.body;
      const oldorder = await Orders.findOne({ order_id });
      
      if (oldorder) {
        // Save new OrderFoodItems and collect their IDs
        const orderFoodItemsPromises = new_order_items.items.map(async (item) => {
          const newOrderFoodItem = new OrderFoodItems({
            food: item._id,
            quantity: item.quantity.toString(), // Ensure quantity is stored as a string
          });
          return await newOrderFoodItem.save();
        });

        const savedOrderFoodItems = await Promise.all(orderFoodItemsPromises);

        // Save new SingleOrder
        const newSingleOrder = new SingleOrders({
          items: savedOrderFoodItems.map(item => item._id),
          notes: new_order_items.notes,
          item_total: new_order_items.item_total,
          charges: new_order_items.charges,
          total_price: new_order_items.total_price,
          status: new_order_items.status,
        });

        const savedSingleOrder = await newSingleOrder.save();
        const calculatedtaxrate=(0.01*(parseFloat(cgst)+parseFloat(sgst))).toFixed(2);
        // Add new SingleOrder to the existing order
        oldorder.order_items.push(savedSingleOrder._id);
        const total_quantity=(parseInt(oldorder.total_quantity))+parseInt(new_total_quantity);
        // Recalculate the bills
        const initial_bill = (parseFloat(oldorder.initial_bill) + parseFloat(new_initial_bill)).toFixed(2);
        const tax = (parseFloat(initial_bill) * parseFloat(calculatedtaxrate)).toFixed(2);
        const total_bill = (parseFloat(initial_bill) + parseFloat(tax)).toFixed(2);
        oldorder.total_quantity=total_quantity;
        oldorder.initial_bill = initial_bill.toString();
        oldorder.tax = tax.toString();
        oldorder.total_bill = total_bill.toString();
        oldorder.order_status = "updated";

        await oldorder.save();
        res.status(200).json({ success: true, data: oldorder });
      } else {
        res.status(201).json({
          success: false,
          error: "Failed to add new items. Order in-person to the waiter.",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(201).json({
        success: false,
        error: "We are facing some technical issues currently, you can however order in-person directly to the waiter.",
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
