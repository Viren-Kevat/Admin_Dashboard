import { userApprovel ,getAllUser} from "../controller/admin_controller";
import { protect } from "../middleware/admin_auth";
import {Router} from "express";


const router = Router()

router.route("/approve/:id").post(protect,userApprovel);
router.route("/all").post(protect,getAllUser);


export default router