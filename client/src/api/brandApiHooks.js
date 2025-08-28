import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";

export const useBrands = (filters = {}) => {
  const { setLoading } = useLoading(); 
  return useQuery({
    queryKey: ["brand", filters],
    queryFn: async () => {
      setLoading(true);
      try {
        return await getBrands(filters);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useBrand = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getBrandById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddBrand = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addBrand(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateBrand(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteBrand(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};
