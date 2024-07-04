import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";


const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { orderId } = req.body;
      const orders = await Orders.find({ order_id:orderId })
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
        if(orders.length > 0) {
      res.status(200).json({ success: true, data: orders });
        }
        else{
            res.status(201).json({ success: false, message: 'No order found' });
        }
    } catch (e) {
      console.error(e);
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
