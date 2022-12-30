const express = require('express');
const app = express();
const cors = require('cors');
const dbconnection = require('./db');
app.use(express.json());
app.use(cors());

app.use('/api/cars', require('./routes/carsRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/bookings', require('./routes/bookingsRoute')); const path = require('path')

if (process.env.NODE_ENV === 'production') {

    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}


const port = process.env.PORT || 5000;



app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})