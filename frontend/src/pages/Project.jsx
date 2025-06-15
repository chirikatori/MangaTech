import Sidebar from "../components/Sidebar";

const Project = () => {
  return (
    <div className="flex h-screen w-screen bg-stone-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 text-white">
        <h1 className="mt-4">Project</h1>
        <p>This is the project page.</p>
      </div>
    </div>
  );
};

export default Project;
