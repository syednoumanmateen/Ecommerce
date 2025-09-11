import { useRemoveFromWishlist, useClearWishlist, useWishlist } from '../api/wishlistApiHooks';
import ProductCard from '../components/product/ProductCard';
import { useUser } from '../context/UserContext';

const Wishlist = () => {
  const { userData } = useUser();
  const userId = userData?.user._id;

  const { data } = useWishlist(userId);
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const clearWishlistMutation = useClearWishlist();

  const handleClear = () => {
    clearWishlistMutation.mutate(_id);
  };

  const handleRemove = (_id) => {
    removeFromWishlistMutation.mutate(_id);
  };

  return (
    <div className="my-5">
      <h3 className="mb-4 text-center">Your Wishlist</h3>

      {data?.data?.items?.length === 0 ? (
        <div className="alert alert-info text-center">Your wishlist is empty</div>
      ) : (
        <div className="row g-4">
          {data?.data?.items?.map(({ product }) => (
             <ProductCard key={product._id} product={product} view={"list"} context="wishlist"/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;