const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.use("/api/books",require('./routes/bookRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
app.use("/api/cartlist",require('./routes/cartRoutes'));
app.use("/api/address",require('./routes/addressRoute'));

app.get("/",(req,res)=> {
    res.json({message:"API is running"});
})

app.post('/api/payment', async (req, res) => {
    try {
      const { token } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Amount in cents
        currency: 'usd',
        payment_method: token,
        confirmation_method: 'manual',
        confirm: true,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error processing payment.' });
    }
  });
  
PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server is running at port 5000");
});