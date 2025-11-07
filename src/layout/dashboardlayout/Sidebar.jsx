import { useState } from "react";
import { NavLink } from "react-router-dom";
import sidebarConfig from "./sidebarConfig";
import bars from "../../assets/icons/bars.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-full bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg ${
        isOpen ? "w-64" : "w-14"
      } transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-600">
        <button onClick={toggleSidebar} className="text-white">
          <img src={bars} alt="Toggle Sidebar" className="h-6 w-6 fill-white" />
        </button>
        {isOpen && <h1 className="text-lg font-semibold">Menu</h1>}
      </div>

      {/* Navigation Links */}
      <nav className="mt-4">
        {sidebarConfig.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center p-4 text-base font-medium ${
                isActive ? "bg-blue-500" : "hover:bg-blue-600"
              } transition duration-200`
            }
          >
            <img src={item.icon} alt={item.text} className="h-5 w-5 mr-3 fill-white" />
            {isOpen && <span>{item.text}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      {/* {isOpen && (
        <div className="absolute bottom-4 w-full text-center text-xs">
          <p className="text-gray-300">© 2024 InvoiceHuddle</p>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
