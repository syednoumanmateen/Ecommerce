import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPatternTypes,
  getPatternTypeById,
  addPatternType,
  updatePatternType,
  deletePatternType,
} from "../api/api";

export const usePatternTypes = (filters = {}) => {

  return useQuery({
    queryKey: ["patterntype", filters],
    queryFn: () => getPatternTypes(filters),
  });
};

export const usePatternType = (id) => {

  return useQuery({
    queryKey: ["patterntype", id],
    queryFn: () => getPatternTypeById(id),
    enabled: !!id,
  });
};

export const useAddPatternType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addPatternType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};

export const useUpdatePatternType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePatternType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};

export const useDeletePatternType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePatternType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};
