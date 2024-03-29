import express, { Express, Request, Response } from "express";
import router from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3003;


app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
})

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})