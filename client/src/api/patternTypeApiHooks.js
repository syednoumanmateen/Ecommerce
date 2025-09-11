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

export const usePatternType = (_id) => {

  return useQuery({
    queryKey: ["patterntype", _id],
    queryFn: () => getPatternTypeById(_id),
    enabled: !!_id,
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
    mutationFn: ({ _id, data }) => updatePatternType(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};

export const useDeletePatternType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id) => deletePatternType(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterntype"] });
    },
  });
};
