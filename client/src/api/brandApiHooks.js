import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../api/api";

export const useBrands = (filters = {}) => {
  return useQuery({
    queryKey: ['brand', filters],
    queryFn: () => getBrands(filters),
  });
};

export const useBrand = (id) => {

  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrandById(id),
    enabled: !!id,
  });
};

export const useAddBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};
