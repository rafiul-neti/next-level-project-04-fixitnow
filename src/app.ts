import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { addressRoutes } from "./modules/address/address.route";
import { servicesRoutes } from "./modules/service/services.route";

const app: Application = express();

app.use(cors({ origin: config.app_url }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/services", servicesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "This response is from the root route!" });
});

app.use(globalErrorHandler);

export default app;
