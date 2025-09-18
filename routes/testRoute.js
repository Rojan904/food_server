import { Router } from "express";
import { testUserController } from "../controllers/testController.js";

//router object
const router=Router();

//routes GET|| POST| UPDATe DELETE
router.get('/test_User', testUserController);
//export
export default router;