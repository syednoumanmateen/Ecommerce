import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "../UI/Accordion";
import RadioGroup from "../UI/RadioGroup";
import Button from "../UI/Button";
import Rating from "../UI/Rating";
import { useCategories } from "../../api/categoriesApiHooks";
import { usePatternTypes } from "../../api/patternTypeApiHooks";
import { useBrands } from "../../api/brandApiHooks";
import { useShopRooms } from "../../api/shopRoomApiHooks";
import { setFilters, clearFilter } from "../../store/slices/productSlice";
import { toast } from "react-toastify";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.product);

  const { data: categories, isError: errorCategories } = useCategories();
  const { data: patterns, isError: errorPatterns } = usePatternTypes();
  const { data: brands, isError: errorBrands } = useBrands();
  const { data: shopRooms, isError: errorShopRooms } = useShopRooms();

  const [open, setOpen] = useState({
    category: true,
    brand: false,
    price: false,
    pattern: false,
    shopRoom: false,
    rating: false,
  });

  const categoryOptions = categories?.data?.data?.map((category) => ({ label: category.name, value: category._id })) ?? [];
  const brandOptions = brands?.data?.data?.map((brand) => ({ label: brand.name, value: brand._id })) ?? [];
  const patternOptions = patterns?.data?.data?.map((pattern) => ({ label: pattern.name, value: pattern._id })) ?? [];
  const shopRoomOptions = shopRooms?.data?.data?.map((shopRoom) => ({ label: shopRoom.name, value: shopRoom._id })) ?? [];

  const priceOptions = [
    { label: "Under $500", value: "null-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "$1000 - $5000", value: "1000-5000" },
    { label: "Over $5000", value: "5000-null" },
  ];

  const ratingOptions = [5, 4, 3, 2, 1];

  const toggleAccordion = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const isError = errorCategories || errorPatterns || errorBrands || errorShopRooms;

  if (isError) toast.error("Failed to load filters. Please try again.")

  const filterSections = [
    {
      key: "category",
      title: "Category",
      options: categoryOptions,
      component: RadioGroup,
      emptyText: "No categories available",
    },
    {
      key: "brand",
      title: "Brands",
      options: brandOptions,
      component: RadioGroup,
      emptyText: "No brands available",
    },
    {
      key: "price",
      title: "Price",
      options: priceOptions,
      component: RadioGroup,
    },
    {
      key: "pattern",
      title: "Pattern Type",
      options: patternOptions,
      component: RadioGroup,
      emptyText: "No patterns available",
    },
    {
      key: "shopRoom",
      title: "Shop Room",
      options: shopRoomOptions,
      component: RadioGroup,
      emptyText: "No shop rooms available",
    },
    {
      key: "rating",
      title: "Rating",
      options: ratingOptions,
      component: Rating,
    },
  ];

  return (
    <div className="rounded space-y-2 text-lg select-none">
      <Button className="button px-2 py-1 mb-3" onClick={() => dispatch(clearFilter())}>Clear Filter</Button>
      {filterSections.map(({ key, title, options, component: Component, emptyText }) => (
        <Accordion key={key} title={title} isOpen={open[key]} toggle={() => toggleAccordion(key)}>
          {options?.length ? (
            <Component
              options={options}
              name={key}
              selected={filters[key]}
              onChange={(val) => handleFilterChange(key, val)}
            />
          ) : emptyText ? (
            <p className="text-gray-500">{emptyText}</p>
          ) : null}
        </Accordion>
      ))}
    </div>
  );
};

export default ProductFilter;
