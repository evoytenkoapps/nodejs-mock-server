import express from "express";
import bodyParser = require("body-parser");

const app = express();

const PORT: number = 8082;

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
  //res.setHeader("access-control-allow-origin", "http://localhost:3000");
  //res.setHeader("access-control-allow-origin", "http://localhost:63342");
  res.setHeader("access-control-allow-origin", "*");
  next();
});

app.get("/v2/GetTerminalStatus", (req, res) => {
  const data = { ErrorCode: "0", Success: true, TerminalStatus: "P" };
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
