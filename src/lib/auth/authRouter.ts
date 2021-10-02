import { Router } from "express";
import controller from "./authController";
import authRequired from "./authRequired";

const router = Router();

router.post("/", authRequired, controller.isAuth);
router.put("/user", authRequired, controller.updateCurrentRoom);
router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/logout", controller.logout);
export default router;
