const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL = process.env.EMAIL; // Your email address
const PASSWORD = process.env.PASSWORD; // Your email password

const emailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" }); 
        }

        const verificationToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1d' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            verificationToken,
        });

        const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`,
        };

        emailSender.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.cookie("authToken", verificationToken, {
            httpOnly: true,
            sameSite: "lax",
            maxage : 1000*60*60*24*7   // 7 days
        });

        res.cookie("userId", user._id, {
            httpOnly: false,
        });

        return res.status(201).json({ result: user, message: "User created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" }); // 500 means server error
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" }); // 404 means not found
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" }); // 400 means bad request
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, { expiresIn: '1d' });
        
        // res.setHeader('Authorization', `Bearer ${token}`); // Set the Authorization header

        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite : "lax",
            maxage : 1000*60*60*24*7    // 7 days
            // Other cookie options (e.g., secure, sameSite, maxAge, etc.)
        });
        res.cookie("userId", existingUser._id, {
            httpOnly: false,
        });

        res.status(200).json({ user: existingUser, token: token ,message : "Login Sucessfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" }); // 500 means server error
    }
}

const verify = async (req, res) => {
    const token = req.query.token;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const email = decodedToken.email;

        const user = await userModel.findOne({ email, verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Email verification failed" });
    }
};

const logout = async (req, res) => {
    res.clearCookie("authToken");
    res.render('login',{message : "Logout Sucessfully"});
}


module.exports = {signup,login,logout,verify}