import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDatabase from "./database/connect.js";
import router from "./router/routes.js";
import cron from 'node-cron';

import { notFound,errorHandler } from "./errorHandler/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://table-mate.onrender.com"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(cookieParser())
// API routes
app.use("/api", router);



app.use(morgan("tiny"));
app.use(notFound)
app.use(errorHandler)

app.use(express.urlencoded({ extended: true }));

const port = 8080;



// Start the server when we have a valid DB connection
try {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
} catch (error) {
  console.log("Cannot connect to the server");
}


