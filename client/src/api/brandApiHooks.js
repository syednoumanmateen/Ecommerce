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

export const useBrand = (_id) => {

  return useQuery({
    queryKey: ["brand", _id],
    queryFn: () => getBrandById(_id),
    enabled: !!_id,
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
    mutationFn: ({ _id, data }) => updateBrand(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id) => deleteBrand(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};
