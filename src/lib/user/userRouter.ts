import { Router } from "express";
import { authRequired } from "../auth/";
import * as controller from "./userController";

const router = Router();

router.put("/", authRequired, controller.updateUserData);
router.put("/avatar", authRequired, controller.uploadPhoto);
router.get("/avatar/:filename", authRequired, controller.getImage);

export default router;
