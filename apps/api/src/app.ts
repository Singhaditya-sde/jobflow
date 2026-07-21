import express, { type Express } from "express";
import cors from "cors";

import routes from "./routes";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5174", // Your dashboard URL
    credentials: true,
  })
);

app.use(express.json());

app.use(routes);

export default app;