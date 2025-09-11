import { useDispatch } from 'react-redux';
import { useCart } from '../api/cartApiHooks';
import ProductCard from '../components/product/ProductCard';
import { useUser } from '../context/UserContext';
import { addCartItems } from '../store/slices/activeItemSlice';
import { useEffect } from 'react';

const Cart = () => {
  const { userData } = useUser();
  const userId = userData?.user._id;
  const dispatch = useDispatch()

  const { data } = useCart(userId);
  useEffect(() => {
    if (data?.data?.items) {
      dispatch(addCartItems(data?.data?.items?.map(i => i._id)));
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen gap-2 p-2">
      <main className="flex-1 flex flex-col">
        <header className="p-2 mx-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Cart</h1>
        </header>

        <section className="flex-1 overflow-y-auto scrollbar-hide p-2">
          {data?.data?.items?.length > 0 ? (
            <div
              className="grid grid-cols-1 gap-4"            >
              {data?.data?.items?.map((product) => (
                <ProductCard key={product._id} product={product} view={'list'} context="cart" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No products found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Cart;
