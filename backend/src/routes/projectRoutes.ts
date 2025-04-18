import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputValidation } from "../middleware/validation";

const router = Router();

router.post(
  "/",
  [
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  handleInputValidation,
  ProjectController.createProject
);

export default router;
