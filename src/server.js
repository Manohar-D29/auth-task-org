import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./db/mongo-connection.js";
import app from "./app.js";


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err)
});