import { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { project } = req;
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      project.tasks.push(task.id);
      await Promise.allSettled([task.save(), project.save()]);
      res.send("Task created successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static getTasks = async (req: Request, res: Response) => {
    const { project } = req;
    try {
      const tasks = await Task.find({ project: project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.json(req.task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      await req.task.updateOne(req.body);
      res.send("Task updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      // Delete the task from the project
      const project = await Project.findById(req.task.project);
      project.tasks = project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );

      Promise.allSettled([project.save(), req.task.deleteOne()]);
      res.send("Task deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      await req.task.updateOne({ status: req.body.status });
      res.send("Task status updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };
}
