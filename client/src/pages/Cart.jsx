import { useCart, useDeleteCart, useUpdateCart } from '../api/cartApiHooks';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/UI/Button';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

const Cart = () => {
  const { userData } = useUser();
  const userId = userData?.user._id;

  const { data } = useCart(userId);
  const updateCartMutation = useUpdateCart();
  const deleteCartMutation = useDeleteCart();

  const handleUpdate = (_id, quantity) => {
    if (quantity < 1) return;
    updateCartMutation.mutate({ _id, data: { quantity } });
  };

  const handleRemove = (_id) => {
    deleteCartMutation.mutate(_id);
  };

  const cartItems = data?.data?.items || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="my-5">
      <h3 className="mb-4 text-center">Your CArt</h3>

      {data?.data?.items?.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty</div>
      ) : (
        <>
          <div className="g-4">
            {data?.data?.items?.map(({ product }) => (
              <ProductCard key={product._id} product={product} view={"list"} context="cart" />
            ))}
          </div>

          <div className="d-flex justify-content-end">
            <h4>
              Total: <span className="text-success">${total.toFixed(2)}</span>
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
