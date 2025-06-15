import { ScanText, FileText, Languages } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Text Detection", icon: <ScanText className="w-5 h-5" />, path: "/text-detection" },
    { name: "Text Recognition", icon: <FileText className="w-5 h-5" />, path: "/settings" },
    { name: "Transcript translation", icon: <Languages className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div className="h-screen w-70 bg-neutral-800 p-4 font-bold text-white shadow-lg flex-shrink-0 overflow-y-auto">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded transition cursor-pointer">
            <Link to={item.path} className="flex items-center gap-2 w-full mt-2 p-4 rounded hover:bg-gray-700">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
