import { IoMdSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import CardBody from "../CardBody";

const IconButton = ({ children, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    type="button"
    aria-label={ariaLabel}
    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-200"
  >
    {children}
  </button>
);

const ProductCard = ({ image, category, brand, name, price, onClick }) => {
  return (
    <CardBody className="relative group cursor-pointer rounded-xl">
      <img
        onClick={onClick}
        src={image}
        alt={name}
        className="w-full h-65 object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <IconButton ariaLabel="View product">
          <IoMdSearch size={20} />
        </IconButton>

        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2 pointer-events-none group-hover:pointer-events-auto">
          <IconButton ariaLabel="Add to wishlist">
            <CiHeart size={20} />
          </IconButton>
          <IconButton ariaLabel="Add to cart">
            <IoBagOutline size={20} />
          </IconButton>
        </div>
      </div>

      <div className="space-y-1 p-4">
        <div className="flex justify-between text-sm text-gray-500">
          <p className="truncate">{category}</p>
          <p className="truncate">{brand}</p>
        </div>
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          onClick={onClick}
        >
          {name}
        </h3>
        <p className="text-green-600 font-medium text-lg">${price}</p>
      </div>
    </CardBody>
  );
};

export default ProductCard;
