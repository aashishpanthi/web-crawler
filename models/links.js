import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "url is required"],
  },
  found: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  backLinks: {
    type: Number,
    required: [true, "Backlink count is required"],
  },
});

const Link = mongoose.model("Link", LinkSchema);

export default Link;
