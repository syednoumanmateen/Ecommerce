import { useParams } from "react-router-dom";
import { useProduct } from "../../api/productsApiHooks";
import { useAddCart, useRemoveFromCart, useUpdateCart } from "../../api/cartApiHooks";
import { useAddWishlist, useRemoveFromWishlist } from "../../api/wishlistApiHooks";
import { useUser } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../store/slices/activeItemSlice";
import { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import RoundButton from "../../components/UI/RoundButton";
import ImageGallery from "../../components/ImageGallery";

const BASE_URL = "http://localhost:5000/uploads/";

const View = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userData } = useUser();

  const { data, isLoading, error } = useProduct(id);
  const product = data?.data?.data;

  const cartItems = useSelector((state) => state.activeItem.cartItems);
  const wishlistItems = useSelector((state) => state.activeItem.wishlistItems);

  const addCartMutation = useAddCart();
  const removeCartMutation = useRemoveFromCart();
  const updateQtyMutation = useUpdateCart();
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveFromWishlist();

  const isInCart = cartItems.includes(product?._id);
  const isInWishlist = wishlistItems.includes(product?._id);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.quantity) setQuantity(product.quantity);
  }, [product]);

  if (isLoading) return <div className="text-center p-10">Loading product...</div>;
  if (error || !product) return <div className="text-center text-red-500 p-10">Product not found.</div>;

  const imageUrls = (product?.images || []).map((img) =>
    img.startsWith("http") ? img : `${BASE_URL}${img}`
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      const payload = {
        userId: userData?.user?._id,
        item: {
          productId: product._id,
          quantity,
          price: product.price,
        },
      };
      addCartMutation.mutate(payload);
      dispatch(addCartItem(product._id));
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart) {
      removeCartMutation.mutate({
        userId: userData?.user?._id,
        productId: product._id,
      });
      dispatch(removeCartItem(product._id));
    }
  };

  const handleQtyChange = (change) => {
    const newQty = Math.max(1, quantity + change);
    setQuantity(newQty);
    updateQtyMutation.mutate({
      userId: userData?.user?._id,
      productId: product._id,
      quantity: newQty,
    });
  };

  const handleManualQty = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      updateQtyMutation.mutate({
        userId: userData?.user?._id,
        productId: product._id,
        quantity: value,
      });
    }
  };

  const handleAddWishlist = () => {
    if (!isInWishlist) {
      addWishlistMutation.mutate({
        userId: userData?.user?._id,
        productId: product._id,
      });
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isInWishlist) {
      removeWishlistMutation.mutate({
        userId: userData?.user?._id,
        productId: product._id,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">

        <div className="md:col-span-6">
          <ImageGallery imageUrls={imageUrls} />
        </div>

        <div className="md:col-span-4 my-auto">

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex flex-wrap items-center space-x-4 mb-3">
            <p className="text-green-600 font-medium text">${product.price}</p>
            <span className="text-green-600 text-xs md:text-sm">{product.quantity} in stock</span>
          </div>

          <div className="flex items-center space-x-1 text-yellow-400 mb-4 text-sm md:text-base">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating || 4) ? "★" : "☆"}</span>
              ))}
            <span className="text-gray-600 ml-2">
              ({product.rating?.toFixed(1) || "4.0"} reviews)
            </span>
          </div>

          <ul className="text-gray-700 list-disc ml-5 space-y-1 text-sm md:text-base mb-3">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Mea volumus verterem adipisci at</li>
            <li>Mel ex mundi scripta gloriatur</li>
          </ul>


          <div className="space-y-4">
            <div className="flex gap-1 items-center">
              <RoundButton
                className="py-1 px-2"
                onClick={() => handleQtyChange(-1)}
              >
                -
              </RoundButton>
              <input
                type="number"
                value={quantity}
                onChange={handleManualQty}
                min={1}
                className="w-16 text-center py-1"
              />
              <RoundButton
                className="py-1 px-2"
                onClick={() => handleQtyChange(1)}
              >
                +
              </RoundButton>
            </div>


            <div className="flex flex-wrap gap-3 md:gap-4">
              {isInCart ? (
                <Button className="button p-2 flex-1 md:flex-none text-center" onClick={handleRemoveFromCart}>
                  Remove from Cart
                </Button>
              ) : (
                <Button className="button p-2 flex-1 md:flex-none text-center" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}

              {isInWishlist ? (
                <Button className="button p-2 flex-1 md:flex-none text-center" onClick={handleRemoveFromWishlist}>
                  Remove from Wishlist
                </Button>
              ) : (
                <Button className="button p-2 flex-1 md:flex-none text-center" onClick={handleAddWishlist}>
                  Add to Wishlist
                </Button>
              )}
            </div>

            <div className="text-sm md:text-base text-gray-500 space-y-1">
              <div>
                <strong>SKU:</strong> {product.sku || "N/A"}
              </div>
              <div>
                <strong>Category:</strong> {product.category?.name || product.category}
              </div>
              <div>
                <strong>Tags:</strong> {product.tags?.join(", ") || "Newest"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default View;
