import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { addressRoutes } from "./modules/address/address.route";

const app: Application = express();

app.use(cors({ origin: config.app_url }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("This response if from the root route!");
});

app.use(globalErrorHandler);

export default app;
