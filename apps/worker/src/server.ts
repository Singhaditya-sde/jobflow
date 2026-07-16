import express from "express";
import metricsRoutes from "./routes/metrics.route";

const app = express();

app.use("/metrics", metricsRoutes);

app.listen(3001, () => {
  console.log("Worker Metrics :3001");
});