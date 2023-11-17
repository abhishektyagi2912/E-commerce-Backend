var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var authRouter = require('./routes/auth');
var productRouter = require('./routes/productRoutes');
var profileRouter = require('./routes/profileRoute');
var ordersRouter = require('./routes/orderRoutes');
var cartRouter = require('./routes/cartRoutes');

const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authmiddleware = require('./middlewares/auth');


dotenv.config();
app.set('view engine', 'ejs');
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' })); // here we set the limit of the body
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(authRouter);
app.use('/', authmiddleware, productRouter);
app.use('/profile', authmiddleware, profileRouter);
app.use('/orders', authmiddleware, ordersRouter);
app.use('/cart', authmiddleware, cartRouter);

// app.get('/', authmiddleware, (req, res) => {
//     res.render('home')
// });
app.use((req, res) => {
    res.render('error');
});

// Path: app.js
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening the port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
