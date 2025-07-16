import { Router } from "express";
import { signupUser,loginUser,updatePassword,sendLinkForPassword } from "../controller/user_controller";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/update_password").post(updatePassword);
router.route("/sent_Link").post(sendLinkForPassword)
export default router