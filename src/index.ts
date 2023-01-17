import bodyParser = require("body-parser");
import express from "express";

const app = express();

const PORT: number = 8082;
const HOST = "localhost";

app.use(
  bodyParser.json({
    limit: "10mb",
  })
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err) {
      console.warn("bodyParser error:", err.message);
    }
    next();
  }
);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  res.setHeader("access-control-allow-origin", "*");
  next();
});

app.get("/data", (req, res) => {
  const data = { result: "Mock NodeJs Works" };
  res.send(data);
});

app.listen(PORT, HOST, () => {
  console.log(`The application is listening on port ${HOST + ":" + PORT}`);
});
