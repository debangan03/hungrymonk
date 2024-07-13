
import conndb from "../../../middleware/mongoose";
import Transaction from "../../../models/Transaction";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let {orderId,restaurant_id,employees,review,amount}=req.body;
      const u=new Transaction({
        orderId,restaurant_id,employees,review,amount
      });
      const u1=await u.save();
      res.status(200).json({success:true});
    } catch (err) {
      res
        .status(400)
        .json({ success: false, error: err, data: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
