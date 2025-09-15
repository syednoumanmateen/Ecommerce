import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoGrid, IoList } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../api/productsApiHooks";
import ProductCard from "../../components/product/ProductCard";
import ProductFilter from "../../components/product/ProductFilter";
import Button from "../../components/UI/Button";
import RoundButton from "../../components/UI/RoundButton";
import Pagination from "../../components/UI/Pagination"; // ✅ import Pagination component
import { setPagination, setView } from "../../store/slices/productSlice";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view, filters, search, pagination } = useSelector((state) => state.product);

  const { data: productsData, isLoading } = useProducts({
    page: pagination.page,
    limit: pagination.limit || 12,
    filters,
    search,
  });

  const products = productsData?.data?.data ?? [];
  const totalPages = productsData?.data?.pages ?? 1;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPagination({ page }));
    }
  };

  useEffect(() => {
    dispatch(setPagination({ page: 1 }));
  }, [filters, search, dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-2 p-2">
      {/* Sidebar (Filters) */}
      <aside className="w-full md:w-72 p-2 md:sticky top-0 h-fit md:h-screen overflow-y-auto scrollbar-hide rounded">
        <ProductFilter />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-2 mx-2 flex flex-row justify-between items-start gap-2">
          <h1 className="text-xl font-semibold">Product Listing</h1>
          <div className="flex space-x-2">
            {[{ type: "grid", icon: <IoGrid size={15} /> }, { type: "list", icon: <IoList size={15} /> }].map(
              ({ type, icon }) => (
                <RoundButton
                  key={type}
                  onClick={() => dispatch(setView(type))}
                  className={`p-1 ${view === type ? "button-round-active" : ""}`}
                >
                  {icon}
                </RoundButton>
              )
            )}
          </div>
        </header>

        {/* Product List */}
        <section className="flex-1 overflow-y-auto scrollbar-hide p-2">
          {isLoading ? (
            <p className="text-gray-500 text-center mt-10">Loading products...</p>
          ) : products.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  view={view}
                  context="product"
                  onClick={() => navigate(`/product/details/${product._id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No products found.</p>
          )}
        </section>

        {/* Pagination Footer */}
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </main>
    </div>
  );
};

export default List;
