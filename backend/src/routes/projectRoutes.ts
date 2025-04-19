import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputValidation } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

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

// Routes for tasks
router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("Invalid project ID"),
  body("name").notEmpty().withMessage("Task title is required"),
  body("description").notEmpty().withMessage("Task description is required"),
  handleInputValidation,
  validateProjectExists,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("Invalid project ID"),
  handleInputValidation,
  validateProjectExists,
  TaskController.getTasks
);

router.get(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("Invalid project ID"),
  handleInputValidation,
  validateProjectExists,
  TaskController.getTaskById
);

export default router;
