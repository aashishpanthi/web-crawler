import scraper from "./controllers/scraper.js";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongoDb.js";

dotenv.config();

connectMongoDB();

scraper();
