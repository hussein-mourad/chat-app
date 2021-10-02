import { Router } from "express";
import { authRequired } from "../auth";
import * as controller from "./messageController";

const router = Router();

router.get("/", authRequired, controller.findAllMessages);
router.get("/:id",authRequired, controller.getMessage);
router.post("/",authRequired, controller.sendMessage);
export default router;
