import { CiBag1, CiHeart, CiTrash } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useAddCart, useRemoveFromCart, useUpdateCart } from "../../api/cartApiHooks";
import { useAddWishlist, useRemoveFromWishlist } from "../../api/wishlistApiHooks";
import { useUser } from "../../context/UserContext";
import CardBody from "../CardBody";
import CustomSwiper from "../CustomSwiper";
import RoundButton from "../UI/RoundButton";
import ProductInfo from "./ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, addWishlistItem, removeCartItem, removeWishlistItem } from "../../store/slices/activeItemSlice";

const BASE_URL = "http://localhost:5000/uploads/";

const ProductCard = ({ product, view = "grid", context = "product", onClick }) => {
  const { images = [] } = product || {};
  const { userData } = useUser();

  const addCartMutation = useAddCart();
  const updateQtyMutation = useUpdateCart();
  const removeCartMutation = useRemoveFromCart();
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveFromWishlist();

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.activeItem.cartItems);
  const wishlistItems = useSelector(state => state.activeItem.wishlistItems);

  const isInCart = cartItems.includes(product._id);
  const isInWishlist = wishlistItems.includes(product._id);


  const handleAddToCart = () => {
    if (!isInCart) {
      const payload = {
        userId: userData?.user?._id,
        item: {
          productId: product._id,
          quantity: 1,
          price: product.price
        }
      };
      addCartMutation.mutate(payload);
      dispatch(addCartItem(product._id))
    }
  };

  const handleAddWishlist = () => {
    if (!isInWishlist) {
      const payload = {
        userId: userData?.user?._id,
        productId: product._id
      };
      addWishlistMutation.mutate(payload);
      dispatch(addWishlistItem(product._id))
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isInWishlist) {
      const payload = {
        userId: userData?.user?._id,
        productId: product._id
      };
      removeWishlistMutation.mutate(payload);
      dispatch(removeWishlistItem(product._id))
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart) {
      const payload = {
        userId: userData?.user?._id,
        productId: product._id
      };
      removeCartMutation.mutate(payload);
      dispatch(removeCartItem(product._id))
    }
  };

  const handleQtyChange = (change) => {
    const currentQty = product.quantity || 0;
    const newQty = currentQty + change;
    if (newQty > 0) {
      const payload = {
        userId: userData?.user?._id,
        productId: product._id,
        quantity: newQty
      };
      updateQtyMutation.mutate(payload);
    } else {
      handleRemoveFromCart();
    }
  };

  const imageUrls = images.map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`));

  return (
    <CardBody
      className={`relative group ${view === "list"
        ? "flex flex-col sm:flex-row items-center gap-4 p-4"
        : "flex flex-col"
        }`}
    >
      <div
        className={`${view === "list" ? "sm:w-1/4 w-full" : "w-full"
          } shrink-0 relative`}
      >
        <CustomSwiper
          slides={imageUrls}
          slidesPerView={1}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 z-50">
        {context === "product" && (
          <>
            <RoundButton
              className={`p-1 ${isInCart ? "button-round-active bg-gray-300 cursor-not-allowed" : ""
                }`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <CiBag1 size={15} />
            </RoundButton>

            <RoundButton
              className={`p-1 ${isInWishlist ? "button-round-active bg-gray-300 cursor-not-allowed" : ""
                }`}
              onClick={handleAddWishlist}
              disabled={isInWishlist}
            >
              <CiHeart size={15} />
            </RoundButton>
          </>
        )}

        {context === "wishlist" && (
          <>
            <RoundButton
              className={`p-1 ${isInCart ? "button-round-active bg-gray-300 cursor-not-allowed" : ""
                }`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <CiBag1 size={15} />
            </RoundButton>
            <RoundButton className="p-1" onClick={handleRemoveFromWishlist}>
              <CiTrash size={15} />
            </RoundButton>
          </>
        )}

        {context === "cart" && (
          <RoundButton className="p-1" onClick={handleRemoveFromCart}>
            <CiTrash size={15} />
          </RoundButton>
        )}
      </div>

      <div
        className={`${view === "list" ? "flex-1 w-full sm:w-auto" : "w-full"
          } px-2 py-2 sm:px-4`}
      >
        <ProductInfo product={product} onClick={onClick} />
      </div>
      {context === "cart" && (
        <div className="p-4 flex items-center space-x-2">
          <RoundButton onClick={() => handleQtyChange(-1)}>
            <FaMinus size={15} />
          </RoundButton>
          <span className="text-lg">{product.quantity}</span>
          <RoundButton onClick={() => handleQtyChange(1)}>
            <FaPlus size={15} />
          </RoundButton>
        </div>
      )}
    </CardBody>

  );
};

export default ProductCard;
