import express, { urlencoded } from "express";
import path from "path";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from 'helmet'; // Importa helmet
import rideRoute from './routes/rides.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import profileRoute from './routes/profile.js';
/* import reviewRoute from './routes/reviews.js' */
/* import bookingRoute from './routes/bookings.js' */

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log('mongodb connected!');
        }).catch((err) => {
            console.log('error: ', err);
        });
    } catch (error) {
        console.log('MongoDB connected failed');
    }
};

app.use(helmet()); // Usa helmet para configurar las cabeceras de seguridad
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        fontSrc: ["'self'", "https://hop-backend-production.up.railway.app"]
    }
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use(express.static('assets'));
app.use(express.static(process.cwd()+"\\build"));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/rides", rideRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profile", profileRoute);
/* app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute); */
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

app.use(express.static('assets'));
app.get('/*', (req, res) => {
    res.sendFile(process.cwd() + "\\" + 'build' + "\\" + 'index.html');
});

app.listen(port, '0.0.0.0', async () => {
    await connect();
    console.log('server listening on port', port);
});
