const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    capacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    bookedTimeSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true }
        }
    ],
    rentPerHour: {
        type: Number,
        required: true
    },
    //my
    user: { type: String, required: true }
}, { timestamps: true })

const carModel = mongoose.model('cars', carSchema);

module.exports = carModel;
