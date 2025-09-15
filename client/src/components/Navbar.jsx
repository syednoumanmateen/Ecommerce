import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../store/slices/productSlice";

import LogoHeader from "./logo/LogoHeader";
import TextInputIcon from "./UI/TextInputIcon";
import DropDown from "./UI/DropDown";

import { IoMdSearch } from "react-icons/io";
import { MdOutlineChair } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { TbBrandDeezer } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { GiGearStickPattern } from "react-icons/gi";
import { CiUser, CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = [
  { label: "Products", icon: <MdOutlineChair />, path: "/products" },
  { label: "Room", icon: <HiOutlineHomeModern />, path: "/rooms" },
  { label: "Category", icon: <BiCategory />, path: "/categories" },
  { label: "Brand", icon: <TbBrandDeezer />, path: "/brands" },
  { label: "Pattern", icon: <GiGearStickPattern />, path: "/patterns" },
];

const cartIcons = [
  { icon: <CiUser />, type: "dropdown" },
  { icon: <CiHeart />, path: "/wishlist" },
  { icon: <IoBagOutline />, path: "/cart" },
];

const iconClass = "text-xl text-gray-500";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    navigate("/products");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md w-full z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <LogoHeader width="60px" height="60px" direction="row" show={false} />
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-black cursor-pointer"
              >
                <span className={iconClass}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block w-64">
            <form onSubmit={handleSearch}>
              <TextInputIcon
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products"
                iconEnd={<IoMdSearch className={iconClass} />}
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {cartIcons.map((item, index) =>
              item.type === "dropdown" ? (
                <DropDown key={index} icon={item.icon} />
              ) : (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`${iconClass} hover:text-black cursor-pointer`}
                >
                  {item.icon}
                </div>
              )
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden focus:outline-none text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-gray-200 bg-white">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
              >
                <span className={iconClass}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <TextInputIcon
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              iconEnd={<IoMdSearch className={iconClass} />}
            />
          </form>

          <div className="flex items-center gap-6 pt-2">
            {cartIcons.map((item, index) =>
              item.type === "dropdown" ? (
                <DropDown key={index} icon={item.icon} />
              ) : (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`${iconClass} hover:text-black cursor-pointer`}
                >
                  {item.icon}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
