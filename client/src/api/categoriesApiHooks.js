import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";

export const useCategories = (filters = {}) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["category", filters],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getCategories(filters);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useCategory = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getCategoryById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addCategory(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateCategory(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteCategory(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
