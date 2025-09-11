import { useEffect } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../../api/productsApiHooks";
import ProductCard from "../../components/product/ProductCard";
import ProductFilter from "../../components/product/ProductFilter";
import Button from "../../components/UI/Button";
import RoundButton from "../../components/UI/RoundButton";
import { setPagination, setView } from "../../store/slices/productSlice";

const List = () => {
  const dispatch = useDispatch();
  const { view, filters, search, pagination } = useSelector((state) => state.product);
  const { data: productsData } = useProducts();

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

  const renderPageButton = (page) => (
    <RoundButton
      key={page}
      onClick={() => goToPage(page)}
      className={`px-2 py-1 ${pagination.page === page ? "button-round-active" : ""}`}
    >
      {page}
    </RoundButton>
  );

  const renderPagination = () => {
    const pages = [renderPageButton(1)];

    if (pagination.page > 3 && totalPages > 4) {
      pages.push(<span key="start-ellipsis" className="px-2">…</span>);
    }

    Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((p) => p !== 1 && p !== totalPages && Math.abs(p - pagination.page) <= 1)
      .forEach((p) => pages.push(renderPageButton(p)));

    if (pagination.page < totalPages - 2 && totalPages > 4) {
      pages.push(<span key="end-ellipsis" className="px-2">…</span>);
    }

    if (totalPages > 1) {
      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen gap-2 p-2">
      <aside className="w-full md:w-75 p-2  overflow-y-auto scrollbar-hide">
        <ProductFilter />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="p-2 mx-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Product Listing</h1>
          <div className="flex space-x-2">
            {[
              { type: "grid", icon: <IoGrid size={20} /> },
              { type: "list", icon: <IoList size={20} /> },
            ].map(({ type, icon }) => (
              <RoundButton
                key={type}
                onClick={() => dispatch(setView(type))}
                className={`p-1 ${view === type ? "button-round-active" : ""}`}
              >
                {icon}
              </RoundButton>
            ))}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto scrollbar-hide p-2">
          {products.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  : "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4"
              }
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} view={view} context="product" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No products found.</p>
          )}
        </section>

        <footer className="p-4 flex flex-wrap justify-center items-center bg-white gap-2">
          {pagination.page > 1 && (
            <Button className="p-2" onClick={() => goToPage(pagination.page - 1)}>
              Previous
            </Button>
          )}
          {renderPagination()}
          {pagination.page < totalPages && (
            <Button className="p-2" onClick={() => goToPage(pagination.page + 1)}>
              Next
            </Button>
          )}
        </footer>
      </main>
    </div>
  );
};

export default List;
