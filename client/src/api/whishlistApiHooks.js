import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWhishlists,
  getWhishlistById,
  addWhishlist,
  updateWhishlist,
  deleteWhishlist,
} from "../api/api";
import { useLoading } from "../hooks/LoadingContext";

export const useWhishlists = (filters = {}) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["whishlist", filters],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getWhishlists(filters);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useWhishlist = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["whishlist", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getWhishlistById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddWhishlist = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addWhishlist(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};

export const useUpdateWhishlist = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateWhishlist(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};

export const useDeleteWhishlist = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteWhishlist(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whishlist"] });
    },
  });
};
