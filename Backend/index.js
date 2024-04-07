async function main() {
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
  });

  const dotenv = require("dotenv");
  dotenv.config();

  const cors = require("cors");

  const connectToDB = require("./db/db");
  const express = require("express");

  global.db = await connectToDB();

  const app = express();
  const port = process.env.PORT || 5000;
  app.use(cors());
  app.disable("x-powered-by");

  // app.use("/webhooks", require("./routes/webhooks.route"));

  app.use(express.json());

  app.get("/", async (req, res) => {
    res.json({ message: "backend is up an running" });
  });

  app.use("/auth", require("./routes/auth.route"));
  app.use("/user", require("./routes/update.route"));
  app.use("/Medecin", require("./routes/medecin.route"));
  app.use("/current", require("./routes/user.route"));
  app.use("/book", require("./routes/appointment.route"));
  // app.use("/product", require("./routes/product.route"));
  // app.use("/sale", require("./routes/sales.route"));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();
