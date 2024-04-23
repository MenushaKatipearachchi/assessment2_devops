import { Joi } from "celebrate"; // Schema validation
import { moduleLogger } from "@sliit-foss/module-logger"; // Logging utility

const logger = moduleLogger("Config"); // Initialize logger for this module

class Base {
  // Define validation schema for environment variables
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      DB_URL: Joi.string().required(),
    };
  }

  // Fetch environment variables with defaults
  static get values() {
    return {
      PORT: process.env.PORT ?? 4002,
      DB_URL: process.env.DB_URL,
    };
  }
}

const config = Base.values; // Retrieve config values
const { error } = Joi.object(Base.schema).validate(config); // Validate config

if (error) {
  // Log error and terminate process if validation fails
  logger.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`);
  process.exit(1);
}

export default config; // Export configuration
