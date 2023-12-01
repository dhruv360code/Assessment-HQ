const app = require("./app");
const http = require("http");
require("dotenv").config({ path: "./.env" });

require("./database/mongoDb");

const PORT = 3000;
console.log("PORT", process.env.PORT);

process.on("uncaughtException", (err) => {
  console.log("Caught exception: " + err);
  mongoose.connection.close();
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.log("Caught rejection: " + err);
  mongoose.connection.close();
  process.exit(1); // exit the process
});
process.on("exit", () => {
  mongoose.connection.close();
  console.log("Process exit");
});

const server = http.createServer(app);
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
