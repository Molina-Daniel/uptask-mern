import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project, ProjectFormData } from "@/types";
import { updateProject } from "@/api/ProjectAPI";
import ProjectForm from "./ProjectForm";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  project: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  project,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: project.projectName,
    clientName: project.clientName,
    description: project.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = { formData, projectId };
    mutate(data);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl p-5">
        <h1 className="text-5xl font-black">Edit Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill out the form to edit the project
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Return to Dashboard
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm errors={errors} register={register} />
          <input
            type="submit"
            value="Save Changes"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
