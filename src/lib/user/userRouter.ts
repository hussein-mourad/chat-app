import { Router } from "express";
import {authRequired} from "../auth/";
import * as controller from "./userController"

const router = Router();

router.put("/", authRequired, controller.updateUserData);
export default router;
