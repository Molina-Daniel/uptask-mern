import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.send("Project created successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("Project not found");
        res.status(404).json({ error: error.message });
        return;
      }

      res.json(project);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!project) {
        const error = new Error("Project not found");
        res.status(404).json({ error: error.message });
        return;
      }

      await project.save();
      res.send("Project updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Project not found");
        res.status(404).json({ error: error.message });
        return;
      }

      await project.deleteOne();
      res.send("Project deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };
}
