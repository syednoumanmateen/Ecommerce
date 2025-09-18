import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  getBrands,
  getCategories,
  getPatternTypes,
  getShopRooms,
} from "../api/api";
import { useSelector } from "react-redux";

export const useProducts = () => {
  const { filters, search, pagination } = useSelector(state => state.product);

  return useQuery({
    queryKey: ["products", { search, filters, pagination }],
    queryFn: () => getProducts({
      params: {
        search,
        ...filters,
        page: pagination.page,
        perPage: pagination.perPage,
      },
    }),
    keepPreviousData: true,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (_id) => {
  return useQuery({
    queryKey: ["product", _id],
    queryFn: () => getProductById(_id)
  });
};

export const useBrands = (filters = {}) => {
  return useQuery({
    queryKey: ['brand', filters],
    queryFn: () => getBrands(filters),
  });
};

export const useCategories = (filters = {}) => {

  return useQuery({
    queryKey: ["category", filters],
    queryFn: () => getCategories(filters)
  });
};

export const usePatternTypes = (filters = {}) => {

  return useQuery({
    queryKey: ["patterntype", filters],
    queryFn: () => getPatternTypes(filters),
  });
};

export const useShopRooms = (filters = {}) => {

  return useQuery({
    queryKey: ["shoproom", filters],
    queryFn: () => getShopRooms(filters)
  });
};
