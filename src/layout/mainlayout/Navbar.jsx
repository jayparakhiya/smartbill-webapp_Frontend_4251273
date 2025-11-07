import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const navbarConfig = [
  { text: "Home", url: "/" },
  { text: "About", url: "/about" },
  { text: "Features", url: "/features" },
  { text: "Contact", url: "/contact" },
  { text: "Login", url: "/login" },
  { text: "Sign Up", url: "/signup" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wider">
          InGen
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navbarConfig.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className={`hover:text-blue-400 transition ${
                location.pathname === link.url
                  ? "text-blue-400 font-semibold"
                  : ""
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
