import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
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

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, data }) => updateProduct(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProduct = (_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id) => deleteProduct(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
