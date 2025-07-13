import { Navigate, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p className="w-full text-center">Loading...</p>;
  if (isError) return <Navigate to="/404" replace />;

  if (project)
    return (
      <>
        <h1 className="text-5xl font-black">{project.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {project.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?newTask=true")}
          >
            Add Task
          </button>
        </nav>

        <AddTaskModal />
      </>
    );
}
