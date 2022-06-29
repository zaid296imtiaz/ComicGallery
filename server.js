const express = require("express");
const axios = require("axios");
const cors = require('cors')
const app = express();

const path = require("path");

const port = process.env.PORT || 5000;

app.use(cors())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

app.get("/getComic", (req, res) => {
  axios
    .get("https://xkcd.com/info.0.json")
    .then((response) => res.json(response.data))
    .catch((error) => console.log(error));
});

app.get("/view/:comicId", (req, res) => {
  axios
    .get(`https://xkcd.com/${req.params.comicId}/info.0.json`)
    .then((response) => res.json(response.data))
    .catch((error) => console.log(error));
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Server started on port 5000");
});
