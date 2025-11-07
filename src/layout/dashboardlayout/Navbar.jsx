import { Link, useLocation } from "react-router-dom";
import UserProfile from "../../components/Dashboard/userProfile";

const navbarConfig = [
  {
    text: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="p-4 shadow-md bg-white text-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-blue-600 text-4xl font-extrabold tracking-wide"
          >
            InvoiceHuddle
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {navbarConfig.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className={`text-lg font-medium ${
                location.pathname === link.url
                  ? "text-blue-600 underline"
                  : "text-gray-700 hover:text-blue-600 transition"
              }`}
            >
              {link.text}
            </Link>
          ))}

          {/* Profile Section */}
          <div>
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
