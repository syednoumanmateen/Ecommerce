import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRemoveFromWishlist, useClearWishlist, useWishlist } from '../api/wishlistApiHooks';
import { useUser } from '../context/UserContext';
import { clearWishlist, removeFromWishlist, setUserId, setWishlist } from '../store/slices/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userData } = useUser();
  const userId = userData?.user._id;

  useLayoutEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);

  const { data } = useWishlist(userId);
   console.log(data)

  useEffect(() => {
    if (data) {
      dispatch(setWishlist(data));
    }
  }, [data, dispatch]);

  const removeFromWishlistMutation = useRemoveFromWishlist();
  const clearWishlistMutation = useClearWishlist();

  const handleClear = () => {
    dispatch(clearWishlist());
    clearWishlistMutation.mutate(_id);
  };

  const handleRemove = (_id) => {
    dispatch(removeFromWishlist(_id));
    removeFromWishlistMutation.mutate(_id);
  };

  return (
    <div>
      <h2>Wishlist for User: {userId}</h2>
      {data?.items?.length === 0 ? (
        <p>Wishlist is empty</p>
      ) : (
        <>
          <ul>
            {data?.items?.map(product => (
              <li key={product._id}>
                <img src={product.images[0]} alt={product.name} width={50} />
                <strong>{product.name}</strong>
                <button onClick={() => handleRemove(product._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClear}>Clear Wishlist</button>
        </>
      )}
    </div>
  );
}

export default Wishlist;