import { createTask,removeTask,updateTask,progress,done,getAllTask,getAllTaskForUser} from "../controller/task_controller";
import { protect } from "../middleware/admin_auth";
import { userAuth } from "../middleware/user_auth";
import { Router } from "express";

const  router = Router();
// this apis can only acces by admin
router.route("/admin/add").post(protect,createTask);
router.route("/admin/delete/:id").delete(protect,removeTask)
router.route("/admin/update/:id").put(protect,updateTask)
router.route("/admin/all").get(protect,getAllTask)
// this apis can only acces by approved user
router.route("/progress/:id").put(userAuth,progress)
router.route("/done/:id").put(userAuth,done)
router.route("/userTasks/:id").get(userAuth,getAllTaskForUser)





export default router;