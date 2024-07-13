import crypto from 'crypto';
//import Transaction from "../../../models/Transaction";
import conndb from "../../../middleware/mongoose";
import Transaction from '../../../models/Transaction';
//import nodemailer from "nodemailer";
const handler=async(req, res)=> {
  if (req.method === 'POST') {
    const { order_id, payment_id, signature} = req.body;
    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      try{
        const u = await Transaction.findOneAndUpdate({ orderId: order_id },
          { $set: { paymentstatus: "success" , paymentId:payment_id} },
          { returnNewDocument : true })
        //   try{
            
        //     const {name,emp_id,email,amount,description} = u;
          
        //     const transporter = nodemailer.createTransport({
        //       service: "gmail",
          
        //       auth: {
        //         user: "baksish247@gmail.com",
        //         pass: process.env.NEXT_PUBLC_NODEMAILER_APP_KEY,
        //       },
        //     });
            
        //     const info = await transporter.sendMail({
        //       from: '"Baksish" ', // sender address
        //       to: email, // receiver
        //       subject: "New Tip Recieved", // Subject line
        //       html: `<html lang="en">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <style>
        //         body {
        //             font-family: Arial, sans-serif;
        //             background-color: #f8f9fa;
        //             color: #333;
        //             margin: 0;
        //             padding: 0;
        //         }
        //         .container {
        //             max-width: 600px;
        //             margin: 50px auto;
        //             background-color: #fff;
        //             padding: 20px;
        //             border-radius: 8px;
        //             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        //         }
        //         .header {
        //             text-align: center;
        //             padding: 10px 0;
        //         }
        //         .header h1 {
        //             margin: 0;
        //             color: #0a0a0a;
        //         }
        //         .content {
        //             margin: 20px 0;
        //         }
        //         .content p {
        //             line-height: 1.6;
        //         }
        //         .footer {
        //             text-align: center;
        //             padding: 20px 0;
        //             font-size: 0.9em;
        //             color: #777;
        //         }
        //     </style>
        // </head>
        // <body>
        //     <div class="container">
        //         <div class="header">
        //             <h1>Tip Received!</h1>
        //         </div>
        //         <div class="content">
        //             <p>Dear <strong>${name}&nbsp;</strong><span>(${emp_id})</span>,</p>
        //             <p>We are delighted to inform you that you have received a tip.</p>
        //             <p><strong>Payment Id:</strong> ₹${payment_id}</p>
        //             <p><strong>Amount:</strong> ₹${amount}</p>
        //             <p><strong>Description:</strong> ${description}</p>
        //             <p>Thank you for your excellent service!</p>
        //         </div>
        //         <div class="footer">
        //             <p>&copy; 2024 Baksish. All rights reserved.</p>
        //         </div>
        //     </div>
        // </body>
        // </html>
        // `, // html body
        //     });
            
        //   }
        //   catch(e){
        //     console.log(e)
        //   }
        res.status(200).json({success:true})
      }catch(e){
        res.status(201).json({success:true,error:"Failed to upload in database"})
      }
    } else {
      try{
        const u = await Transaction.findOneAndUpdate({ orderId: order_id },
          { $set: { paymentstatus: "failure"} },
          { returnNewDocument : true })
        res.status(200).json({success:false})
      }catch(e){
        res.status(201).json({success:false,error:"Failed to upload in database"})
      }
      res.status(201).json({success:false,error:"Failed to upload in database"})
    }
  } else {
    res.status(405).end(); 
  }
}
export default conndb(handler);
