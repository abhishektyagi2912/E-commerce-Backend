var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var authRouter = require('./routes/auth');

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
app.use(express.json());

app.use(authRouter);


app.get('/', authmiddleware, (req, res) => {
    res.render('home')
});

// Path: app.js
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening the port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
