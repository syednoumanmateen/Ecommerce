import { CiBag1, CiCircleMinus, CiCirclePlus, CiHeart, CiTrash } from "react-icons/ci";
import { useAddCart, useDeleteCart, useUpdateCart } from "../../api/cartApiHooks";
import { useAddWishlist, useRemoveFromWishlist } from "../../api/wishlistApiHooks";
import { useUser } from "../../context/UserContext";
import CardBody from "../CardBody";
import CustomSwiper from "../CustomSwiper";
import RoundButton from "../UI/RoundButton";
import ProductInfo from "./ProductInfo";

const BASE_URL = "http://localhost:5000/uploads/";

const ProductCard = ({ product, view = "grid", context = "product", onClick }) => {
  const { images = [] } = product || {};
  const { userData } = useUser();

  const addCartMutation = useAddCart();
  const updateQtyMutation = useUpdateCart();
  const removeCartMutation = useDeleteCart();
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveFromWishlist();

  const handleAddToCart = () => {
    const payload = {
      userId: userData?.user?._id,
      item: {
        productId: product._id,
        quantity: 1,
        price: product.price
      }
    };
    addCartMutation.mutate(payload);
  };

  const handleAddWishlist = () => {
    const payload = {
      userId: userData?.user?._id,
      productId: product._id
    };
    addWishlistMutation.mutate(payload);
  };

  const handleRemoveFromCart = () => {
    const payload = {
      userId: userData?.user?._id,
      productId: product._id
    };
    removeCartMutation.mutate(payload);
  };

  const handleRemoveFromWishlist = () => {
    const payload = {
      userId: userData?.user?._id,
      productId: product._id
    };
    removeWishlistMutation.mutate(payload);
  };

  const handleQtyChange = (change) => {
    const payload = {
      userId: userData?.user?._id,
      productId: product._id,
      quantity: product.quantity + change
    };
    if (payload.quantity > 0) {
      updateQtyMutation.mutate(payload);
    } else {
      handleRemoveFromCart();
    }
  };

  const imageUrls = images.map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`));

  return (
    <CardBody
      className={`relative group ${view === "list" ? "flex items-center gap-4 p-4" : ""}`}
    >
      {context === "product" && (
        <CustomSwiper slides={imageUrls} slidesPerView={1} autoplay={true} />
      )}

      {context !== "product" && (
        <img
          src={imageUrls[0]}
          alt={product.name}
          className="w-28 h-28 object-cover rounded-md"
        />
      )}

      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        {context === "product" && (
          <>
            <RoundButton className="p-1" onClick={handleAddToCart}>
              <CiBag1 size={15} />
            </RoundButton>
            <RoundButton className="p-1" onClick={handleAddWishlist}>
              <CiHeart size={15} />
            </RoundButton>
          </>
        )}

        {context === "wishlist" && (
          <>
            <RoundButton className="p-1" onClick={handleAddToCart}>
              <CiBag1 size={15} />
            </RoundButton>
            <RoundButton className="p-1" onClick={handleRemoveFromWishlist}>
              <CiTrash size={15} />
            </RoundButton>
          </>
        )}

        {context === "cart" && (
          <>
            <RoundButton className="p-1" onClick={handleRemoveFromCart}>
              <CiTrash size={15} />
            </RoundButton>
          </>
        )}
      </div>

      <ProductInfo product={product} onClick={onClick} />

      {context === "cart" && (
        <div className="p-4 flex items-center space-x-2">
          <RoundButton onClick={() => handleQtyChange(-1)}>
            <CiCircleMinus size={20} />
          </RoundButton>
          <span className="text-lg">{product.quantity}</span>
          <RoundButton onClick={() => handleQtyChange(1)}>
            <CiCirclePlus size={20} />
          </RoundButton>
        </div>
      )}
    </CardBody>
  );
};

export default ProductCard;
