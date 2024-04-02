import mongoose from "mongoose";
import { moduleLogger } from "@sliit-foss/module-logger";

const logger = moduleLogger("Mongoose-DB-Connector");

export const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      keepAlive: true,
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to the database");
  } catch (error) {
    logger.error(`Database connection Failed | message: ${error.message}`);
  }

  mongoose.connection.on("error", (err) => {
    logger.error(`Database connection Error | message: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.error("Database disconnected");
  });

  mongoose.connection.on("connected", () => {
    logger.info("Database connected");
  });
};
