if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const Booking = require("../models/bookingModel");
const router = express.Router();
const Car = require('../models/carModel');
const { v4: uuidv4 } = require('uuid');
const sk = process.env.SECONDARY_KEY
const stripe = require('stripe')(sk);


router.post('/bookcar', async (req, res) => {

    const { token } = req.body
    console.log(req.body);
    //   console.log("0000000000000000000000000000000000000000000000000000000")
    try {

        const customer = await stripe.customers.create({

            email: token.email,
            source: token.id
        });
        console.log(customer)

        const payment = await stripe.paymentIntents.create({
            amount: req.body.totalAmount * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email
        })
        //     console.log("11111111111111111111111111111111111111111111111111")
        console.log(payment);
        if (payment) {
            //     console.log("-----------------------------------------------------------------------");
            req.body.transactionId = payment.id;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({ _id: req.body.car })
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);

            await car.save();
            res.send('Your booking is successfull');
        }
        else {
            //         console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            return res.status(400).json(error);
        }
    }
    catch (error) {
        //      console.log("**********************************************************");
        console.log(error);
        return res.status(400).json(error);
    }

})



router.get('/getallbookings', async (req, res) => {

    try {
        const bookings = await Booking.find().populate('car')
        res.send(bookings)
    }
    catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

module.exports = router;