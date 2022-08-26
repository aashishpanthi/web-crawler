import scraper from "./controllers/scraper.js";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongoDb.js";

dotenv.config();

const url = "https://www.britannica.com/technology/computer";

connectMongoDB();

scraper(url);
