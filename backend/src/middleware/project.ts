import type { NextFunction, Request, Response } from "express";
import Project, { IProject } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Project not found");
      res.status(404).json({ error: error.message });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
