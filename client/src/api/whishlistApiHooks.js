import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWhishlists,
  getWhishlistById,
  addWhishlist,
  updateWhishlist,
  deleteWhishlist,
} from "../api/api";

export const useWhishlists = (filters = {}) => {

  return useQuery({
    queryKey: ["whishlist", filters],
    queryFn: () => getWhishlists(filters)
  });
};

export const useWhishlist = (id) => {

  return useQuery({
    queryKey: ["whishlist", id],
    queryFn: () => getWhishlistById(id),
    enabled: !!id,
  });
};

export const useAddWhishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addWhishlist(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};

export const useUpdateWhishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateWhishlist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};

export const useDeleteWhishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteWhishlist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};
