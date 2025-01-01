import express from "express";
import cors from "cors";
import UserModal from "./modals/user.modal.js";
import cookieParser from "cookie-parser";
import connect from "./config/mongoose.config.js";
import homeRoutes from "./routes/Home.routes.js"
import userRoutes from "./routes/user.routes.js"
connect()

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true, // Allows cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser());

app.use("/", homeRoutes)
app.use("/users", userRoutes)
app.use("/home", homeRoutes)

app.get("/check", (req, res) => {
    res.cookie("test", "test-value", {
        httpOnly: false, // Allows access to the cookie from JavaScript
        secure: false,   // Set to true if your site is served over HTTPS
        sameSite: "strict", // Helps mitigate CSRF; can be "lax" or "none" if needed
        path: "/Check"
    });
    res.json({ message: 'Hello from the server!' });
})

export default app;