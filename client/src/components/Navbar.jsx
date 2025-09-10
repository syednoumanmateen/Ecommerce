import LogoHeader from "./logo/LogoHeader";
import TextInputIcon from "./UI/TextInputIcon";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineChair } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { TbBrandDeezer } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { GiGearStickPattern } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DropDown from "./UI/DropDown";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSearch } from "../store/slices/productSlice";

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

const iconClass = "text-lg text-gray-500";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    navigate("/products");
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2 px-4">
      <div className="col-span-1 flex items-center pointer" onClick={() => navigate("/")}>
        <LogoHeader width="80px" height="80px" direction="row" show={false} />
      </div>

      <div className="col-span-5">
        <div className="flex gap-4">
          {navItems.map((item, index) => (
            <div onClick={() => navigate(item.path)}
              key={index}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer"
            >
              <span className={iconClass}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-3">
        <form onSubmit={handleSearch}>
          <TextInputIcon
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products"
            iconEnd={<IoMdSearch className={iconClass} />}
          />
        </form>
      </div>

      <div className="col-span-3">
        <div className="flex justify-end gap-4 items-center">
          {cartIcons.map((item, index) => {
            if (item.type === "dropdown") {
              return <DropDown key={index} icon={item.icon} />;
            }

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`${iconClass} hover:text-black cursor-pointer`}
              >
                {item.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;