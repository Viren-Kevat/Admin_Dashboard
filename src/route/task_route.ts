import { createTask,removeTask,updateTask } from "../controller/task_controller";
import { protect } from "../middleware/admin_auth";
import { Router } from "express";

const  router = Router();

router.route("/admin/add").post(protect,createTask);
router.route("/admin/delete/:id").delete(protect,removeTask)
router.route("/admin/update/:id").put(protect,updateTask)


export default router;