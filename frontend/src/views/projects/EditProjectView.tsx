import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectFrom";

export default function EditProjectView() {
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
    return <EditProjectForm project={project} projectId={projectId} />;
}
