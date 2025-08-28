import { useState, useEffect, useCallback } from "react";
import Accordion from "../UI/Accordion";
import RadioGroup from "../UI/RadioGroup";
import Rating from "../UI/Rating";
import { useCategories } from '../../api/categoriesApiHooks';
import { usePatternTypes } from '../../api/patternTypeApiHooks';
import { useBrands } from '../../api/brandApiHooks';
import { useShopRooms } from '../../api/shopRoomApiHooks';

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const ProductFilter = () => {
    const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: patterns, isLoading: loadingPatterns } = usePatternTypes();
  const { data: brands, isLoading: loadingBrands } = useBrands();
  const { data: shopRooms, isLoading: loadingShopRooms } =useShopRooms();

  if (loadingCategories || loadingPatterns || loadingBrands||loadingShopRooms) {
    return <p>Loading filters...</p>;
  }

  const [open, setOpen] = useState({
    category: true,
    brand: false,
    price: false,
    color: false,
    pattern: false,
    rating: false,
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
    color: "",
    pattern: "",
    rating: "",
  });

  const toggleAccordion = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const debouncedFetch = useCallback(
    debounce((filters) => {
      console.log("Fetching products with filters:", filters);
    }, 5000),
    []
  );

  useEffect(() => {
    debouncedFetch(filters);
  }, [filters, debouncedFetch]);



  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <div className="h-full w-70 rounded space-y-2 text-lg select-none">
      <Accordion
        title="Category"
        isOpen={open.category}
        toggle={() => toggleAccordion("category")}
      >
        <RadioGroup
          options={categoryOptions}
          name="category"
          selected={filters.category}
          onChange={(val) => handleFilterChange("category", val)}
        />
      </Accordion>

      <Accordion
        title="Brands"
        isOpen={open.brand}
        toggle={() => toggleAccordion("brand")}
      >
        <RadioGroup
          options={brandOptions}
          name="brand"
          selected={filters.brand}
          onChange={(val) => handleFilterChange("brand", val)}
        />
      </Accordion>

      <Accordion
        title="Price"
        isOpen={open.price}
        toggle={() => toggleAccordion("price")}
      >
        <RadioGroup
          options={priceOptions}
          name="price"
          selected={filters.price}
          onChange={(val) => handleFilterChange("price", val)}
        />
      </Accordion>

      <Accordion
        title="Pattern Type"
        isOpen={open.pattern}
        toggle={() => toggleAccordion("pattern")}
      >
        <RadioGroup
          options={patternOptions}
          name="pattern"
          selected={filters.pattern}
          onChange={(val) => handleFilterChange("pattern", val)}
        />
      </Accordion>

      <Accordion
        title="Rating"
        isOpen={open.rating}
        toggle={() => toggleAccordion("rating")}
      >
        <Rating
          options={ratingOptions}
          name="rating"
          selected={filters.rating}
          onChange={(val) => handleFilterChange("rating", val)}
        />
      </Accordion>
    </div>
  );
};

export default ProductFilter;
