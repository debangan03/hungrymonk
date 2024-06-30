import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { order_id, new_order_items, new_initial_bill } = req.body;
      const oldorder = await Orders.findOne({ order_id });
      if (oldorder) {
        oldorder.order_items.push(new_order_items);
        const initial_bill = (
          parseFloat(oldorder.initial_bill) + parseFloat(new_initial_bill)
        ).toFixed(2);
        const tax = (parseFloat(initial_bill) * 0.18).toFixed(2);
        const total_bill = (parseFloat(initial_bill) + parseFloat(tax)).toFixed(
          2
        );
        oldorder.initial_bill = initial_bill.toString();
        oldorder.tax = tax.toString();
        oldorder.total_bill = total_bill.toString();
        oldorder.order_status="updated";

        await oldorder.save();
        res.status(200).json({ success: true, data: oldorder });
      }
      else
      {
        res
        .status(201)
        .json({
          success: false,
          error:
            "Failed to add new items. Order in-person to the waiter",
        });
      }
      // const order_status="newly updated"

      // const order=await Orders.findOneAndUpdate({order_id},{order_items,initial_bill,tax,total_bill,order_status});
      
    } catch (e) {
      res
        .status(201)
        .json({
          success: false,
          error:
            "We are facing some technical issue currently, you can however order in-person directly to the waiter",
        });
    }
  } else {
    res
      .status(201)
      .json({
        success: false,
        error:
          "We are facing some technical issue currently, you can however order in-person directly to the waiter",
      });
  }
};
export default conndb(handler);
