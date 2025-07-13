import { z } from "zod";

// Projects
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;

// Tasks
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export const tasksSchema = z.object({
  _id: z.string(),
  name: z.string(),
  project: z.string(),
  description: z.string(),
  status: taskStatusSchema,
});

export type Task = z.infer<typeof tasksSchema>;

export type TaskFormData = Pick<Task, "name" | "description">;
