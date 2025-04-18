import { Router } from "express";
import { body, param } from "express-validator";
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

router.get("/", ProjectController.getProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project ID"),
  handleInputValidation,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project ID"),
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputValidation,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project ID"),
  handleInputValidation,
  ProjectController.deleteProject
);

export default router;
