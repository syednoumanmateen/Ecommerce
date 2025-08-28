import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";
import { useLoading } from "../hooks/LoadingContext";

export const useProducts = (filters = {}) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["product", filters],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getProducts(filters);
      } finally {
        setLoading(false);
      }
    },
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
