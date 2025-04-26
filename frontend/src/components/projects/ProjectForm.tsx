import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "@/types";
import ErrorMessage from "@/components/ErrorMessage";

type ProjectFormProps = {
  errors: FieldErrors<ProjectFormData>;
  register: UseFormRegister<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Project
        </label>
        <input
          id="projectName"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Project Name"
          {...register("projectName", {
            required: "Project Name is required",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Client
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Client Name"
          {...register("clientName", {
            required: "The client name is required",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Project Description"
          {...register("description", {
            required: "A project description is required",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
