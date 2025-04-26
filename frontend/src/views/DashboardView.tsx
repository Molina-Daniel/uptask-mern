import { Link } from "react-router";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Track and manage your projects
      </p>

      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          New Project
        </Link>
      </nav>
    </>
  );
}
