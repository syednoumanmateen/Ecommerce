import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShopRooms,
  getShopRoomById,
  addShopRoom,
  updateShopRoom,
  deleteShopRoom,
} from "../api/api";

export const useShopRooms = (filters = {}) => {

  return useQuery({
    queryKey: ["shoproom", filters],
    queryFn: () => getShopRooms(filters)
  });
};

export const useShopRoom = (id) => {

  return useQuery({
    queryKey: ["shoproom", id],
    queryFn: () => getShopRoomById(id),
    enabled: !!id,
  });
};

export const useAddShopRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addShopRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};

export const useUpdateShopRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateShopRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};

export const useDeleteShopRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteShopRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};
