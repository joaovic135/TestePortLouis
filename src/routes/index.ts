import express,{Request, Response} from "express";
import pendingOrderRoutes from "./pendingOrderRoutes";
const router = express.Router();


router.get("/teste", (req: Request, res: Response) => {
  res.send("API is running teste...");
})

router.use("/pedidosPendentes", pendingOrderRoutes);


export default router;