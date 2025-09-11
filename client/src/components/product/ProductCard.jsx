import { CiBag1, CiHeart } from "react-icons/ci";
import CardBody from "../CardBody";
import CustomSwiper from "../CustomSwiper";
import ProductInfo from "./ProductInfo";
import RoundButton from "../UI/RoundButton";
import { useDispatch } from "react-redux";
import { useAddCart } from "../../api/cartApiHooks"
import { useaddWishlist } from "../../api/wishlistApiHooks"
import { addToCart } from "../../store/slices/cartSlice";
import { addWishlist } from "../../store/slices/wishlistSlice";
import { useUser } from "../../context/UserContext";

const BASE_URL = "http://localhost:5000/uploads/";

const ProductCard = ({ product, view, onClick }) => {
  const { images = [] } = product || {};
  const { userData } = useUser()
  const dispatch = useDispatch();
  const addCartMutation = useAddCart();
  const addWishlistMutation = useaddWishlist();

  const handleAddToCart = (product) => {
    let payload = {
      userId: userData?.user?._id,
      item: {
        productId: product._id,
        quantity: 1,
        price: product.price
      }
    }
    dispatch(addToCart(payload.item));
    addCartMutation.mutate(payload);
  }

  const handleaddWishlist = (product) => {
    let payload = {
      userId: userData?.user?._id,
      productId:product._id
    }
    dispatch(addWishlist(payload.productId));
    addWishlistMutation.mutate(payload);
  }

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
        <RoundButton className={`p-1`} onClick={() => handleAddToCart(product)}>
          <CiBag1 key="heart" size={15} />
        </RoundButton>
        <RoundButton className={`p-1`} onClick={() => handleaddWishlist(product)}>
          <CiHeart key="heart" size={15} />
        </RoundButton>
      </div>

      <ProductInfo product={product} onClick={onClick} />
    </CardBody>
  );
};

export default ProductCard;
