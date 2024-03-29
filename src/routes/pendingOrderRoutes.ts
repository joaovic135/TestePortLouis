import express from "express";
import pendingOrderController from "../controllers/pendingOrderController";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", pendingOrderController.index);

export default router;
