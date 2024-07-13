import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const {amount,reciept} = req.body; // amount in smallest currency unit
    //console.log(amount,reciept)
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: reciept
    };

    try {
      const order = await razorpay.orders.create(options);
      //console.log(order);
      res.status(200).json({success:true,data:order});
    } catch (error) {
      res.status(500).json({success:false, error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
