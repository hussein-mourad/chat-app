import { Router } from "express";
import * as controller from "./roomController";
import {authRequired} from "../auth";

const router = Router();

router.get("/", authRequired, controller.findAllRooms);
router.get("/:id",authRequired, controller.getRoom);
router.post("/",authRequired, controller.createRoom)
router.put("/:id",authRequired, controller.updateRoom)

export default router;
