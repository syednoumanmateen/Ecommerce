import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";
import { useSelector } from "react-redux";

export const useProducts = () => {
  const { filters, search, pagination } = useSelector(state => state.product);
  const { setLoading } = useLoading();

  return useQuery({
    queryKey: ["products", { search, filters, pagination }],
    queryFn: async () => {
      setLoading(true);
      try {
        return await getProducts({
          params: {
            search,
            ...filters,
            page: pagination.page,
            perPage: pagination.perPage,
          },
        });
      } finally {
        setLoading(false);
      }
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getProductById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addProduct(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateProduct(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteProduct(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
