const express = require("express");
const mongoose = require("mongoose");
const nanoid = require("nanoid");
const path = require("path");
const Url = require("./models/url");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/urlshortner")
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname, "views/index.html");
// });
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body.longUrl;

  const shortUrl = nanoid(8);
  const newUrl = new Url({
    longUrl,
    shortUrl,
  });
  await newUrl.save();

  res, json({ shortUrl: `http://localhost:${PORT}/${shortUrl}` });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params.shortUrl;
  const urlEntry = await Url.findOne({ shortUrl });

  if (urlEntry) {
    res.redirect(urlEntry.longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
