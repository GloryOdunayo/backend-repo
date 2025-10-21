import mongoose, { ConnectOptions } from "mongoose";
import colors from "colors";
import REDIS from "../utils/redis.util";

const options: ConnectOptions = {
    autoIndex: true,
    maxPoolSize: 60000,
    writeConcern: {
        wtimeout: 60000,
        wtimeoutMS: 60000,
    },
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000,
    connectTimeoutMS: 60000,
    family: 4,
}

const connectDB = async () => {
    try {

        // connect to redis
        await REDIS.connect()

        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {   
            const dbConnect = await mongoose.connect(process.env.MONGO_URI || "", options);
            console.log(colors.cyan.bold(`MongoDB connected to: ${dbConnect.connection.host}`));
        }
    } catch (error) {
        console.error(colors.red.bold("MongoDB connection error:"), error);
        process.exit(1);
    }
};

export default connectDB;