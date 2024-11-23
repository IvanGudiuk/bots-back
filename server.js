const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose.set("autoIndex", false);

mongoose.connect(DB_HOST).then(() => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log("Server running. Use our API on port:", PORT);
  });
});
