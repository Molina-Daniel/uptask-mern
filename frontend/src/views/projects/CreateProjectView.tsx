import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types";
import ProjectForm from "@/components/projects/ProjectForm";

export default function CreateProjectView() {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForm = (data: ProjectFormData) => {
    console.log(data);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl p-5">
        <h1 className="text-5xl font-black">Create Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill out the form to create a new project
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
            value="Create Project"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
