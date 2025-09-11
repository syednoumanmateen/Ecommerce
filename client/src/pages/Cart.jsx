import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCart, useDeleteCart, useUpdateCart } from '../api/cartApiHooks';
import { useUser } from '../context/UserContext';
import { removeFromCart, setCart, setUserId, updateQuantity } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { userData } = useUser();
  const userId = userData?.user._id;

  useLayoutEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);

  const { data } = useCart(userId);
  console.log(data)

  useEffect(() => {
    if (data) {
      dispatch(setCart(data));
    }
  }, [data, dispatch]);


  const updateCartMutation = useUpdateCart();
  const deleteCartMutation = useDeleteCart();

  const handleUpdate = (_id, quantity) => {
    dispatch(updateQuantity({ _id, quantity }));
    updateCartMutation.mutate({ _id, data: { quantity } });
  };

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
    deleteCartMutation.mutate(_id);
  };

  return (
    <div>
      <h2>Cart for User: {userId}</h2>
      {data?.items?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {data?.items?.map(({ product, quantity, price }) => (
            <li key={product._id}>
              <img src={product.images[0]} alt={product.name} width={50} />
              <strong>{product.name}</strong> x {quantity} (${price} each)
              <strong>{product.name}</strong> x {quantity} (${price} each)
              <button onClick={() => handleUpdate(product._id, quantity + 1)}>+</button>
              <button
                onClick={() => handleUpdate(product._id, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <button onClick={() => handleRemove(product._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;