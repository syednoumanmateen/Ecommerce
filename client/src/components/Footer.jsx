import { CiHeart, CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { MdOutlineChair } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footItems = [
    { label: "Products", icon: <MdOutlineChair />, path: "/" }
  ];

  const iconClass = "text-lg text-gray-500";

  const socialLinks = [
    { icon: <CiHeart className="text-lg" />, path: "/wishlist", label: "Wishlist" },
    { icon: <IoBagOutline className="text-lg" />, path: "/cart", label: "Cart" }
  ];

  return (
    <footer className="bg-white mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <div className="mb-4 md:mb-0">
          &copy; {currentYear} Your Company. All rights reserved.
        </div>
        
        <nav className="flex flex-wrap gap-3 mb-4 md:mb-0">
          {footItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-700 transition"
            >
              <span className={iconClass}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex space-x-4">
          {socialLinks.map(({ icon, path, label }) => (
            <a
              key={label}
              href={path}
              aria-label={label}
              className="hover:text-gray-900"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
