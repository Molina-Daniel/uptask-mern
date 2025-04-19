import { Request, Response } from "express";
import Task from "../models/Task";

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
    const { taskId } = req.params;

    try {
      const task = await Task.findById(taskId);
      if (!task) {
        const error = new Error("Task not found");
        res.status(404).json({ error: error.message });
        return;
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("The task does not belong to the project");
        res.status(400).json({ error: error.message });
        return;
      }
      res.json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;

    try {
      const task = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        const error = new Error("Task not found");
        res.status(404).json({ error: error.message });
        return;
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("The task does not belong to the project");
        res.status(400).json({ error: error.message });
        return;
      }
      res.send("Task updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };
}
