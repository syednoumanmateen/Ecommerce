import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPatternTypes,
  getPatternTypeById,
  addPatternType,
  updatePatternType,
  deletePatternType,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";

export const usePatternTypes = (filters = {}) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["patterntype", filters],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getPatternTypes(filters);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const usePatternType = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["patterntype", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getPatternTypeById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddPatternType = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addPatternType(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};

export const useUpdatePatternType = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updatePatternType(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};

export const useDeletePatternType = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deletePatternType(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};
