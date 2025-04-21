import type { NextFunction, Request, Response } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function validateTaskExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      res.status(404).json({ error: error.message });
      return;
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function validateTaskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { task, project } = req;

    if (task.project.toString() !== project.id.toString()) {
      const error = new Error("The task does not belong to the project");
      res.status(400).json({ error: error.message });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
