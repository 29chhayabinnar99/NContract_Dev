const mongoose = require("mongoose");
// import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  orignalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Url", urlSchema);
