import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  addCart,
  updateCart,
  deleteCart,
} from "../api/api";
import { useLoading } from "../hooks/LoadingContext";

export const useCart = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["cart", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getCart(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addCart(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateCart(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteCart(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
