import { useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import ProductFilter from "../../components/product/ProductFilter";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import RoundButton from "../../components/UI/RoundButton";

const List = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen gap-2">
      <div className="overflow-y-auto scrollbar-hide p-2 bg-white shadow">
        <ProductFilter filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-rows-[auto_1fr_auto] h-full">
        <div className="p-2">
          <h1 className="text-xl font-semibold">Product Listing</h1>
        </div>

        <div className="overflow-y-auto scrollbar-hide p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No products found.</p>
            )}
          </div>
        </div>

        <div className="p-4 flex justify-center items-center bg-white space-x-2">
          {currentPage > 1 && (
            <Button className="py-1 px-2" onClick={() => goToPage(currentPage - 1)}>Previous Page</Button>
          )}

          <RoundButton
            onClick={() => goToPage(1)}
            className={`button-round ${currentPage === 1 ? "bg-primary text-white" : ""}`}
          >
            1
          </RoundButton>

          {currentPage > 3 && totalPages > 4 && <span className="px-2">...</span>}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                Math.abs(page - currentPage) <= 1
            )
            .map((page) => (
              <RoundButton
                key={page}
                onClick={() => goToPage(page)}
                className={`button-round ${currentPage === page ? "bg-primary text-white" : ""}`}
              >
                {page}
              </RoundButton>
            ))}

          {currentPage < totalPages - 2 && totalPages > 4 && <span className="px-2">...</span>}

          {totalPages > 1 && (
            <RoundButton
              onClick={() => goToPage(totalPages)}
              className={`button-round ${currentPage === totalPages ? "bg-primary text-white" : ""}`}
            >
              {totalPages}
            </RoundButton>
          )}

          {currentPage < totalPages && (
            <Button className="py-1 px-2" onClick={() => goToPage(currentPage + 1)}>Next Page</Button>
          )}
        </div>


      </div>
    </div>
  );
};

export default List;
