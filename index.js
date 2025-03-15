// index.js
// where your node app starts

// init project
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  let now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  let isValidDate = Date.parse(date);
  let isValidUnixNumber = /^[0-9]+$/.test(date);

  // Remove the isEmpty check since we handle it with the /api route
  if (isValidDate) {
    res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
  } else if (isValidUnixNumber) {
    res.json({ unix: parseInt(date), utc: new Date(parseInt(date)).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
