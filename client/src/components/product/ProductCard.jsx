import { CiHeart } from "react-icons/ci";
import CardBody from "../CardBody";
import CustomSwiper from "../CustomSwiper";
import ProductInfo from "./ProductInfo";
import RoundButton from "../UI/RoundButton";

const BASE_URL = "http://localhost:5000/uploads/";

const ProductCard = ({ product, view, onClick }) => {
  const { images = [] } = product || {};

  const imageUrls = images.map((img) =>
    img.startsWith("http") ? img : `${BASE_URL}${img}`
  );

  return (
    <CardBody
      className={`relative group cursor-pointer rounded-xl shadow ${view === "list" ? "flex items-center gap-4 p-4" : ""
        }`}
    >
      <CustomSwiper
        slides={imageUrls}
        slidesPerView={1}
        autoplay={true}
      />

      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <RoundButton className={`p-1`}>
          <CiHeart key="heart" size={15} />
        </RoundButton>
      </div>

      <ProductInfo product={product} onClick={onClick} />
    </CardBody>
  );
};

export default ProductCard;
