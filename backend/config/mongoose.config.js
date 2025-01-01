import mongoose from "mongoose";
import "dotenv/config"

function connect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conected to MongoDB")
    })
    .catch(err => {
        console.log(err)
    })
}

export default connect;