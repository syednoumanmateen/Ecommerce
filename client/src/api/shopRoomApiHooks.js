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

export const useShopRoom = (_id) => {

  return useQuery({
    queryKey: ["shoproom", _id],
    queryFn: () => getShopRoomById(_id),
    enabled: !!_id,
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
    mutationFn: ({ _id, data }) => updateShopRoom(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};

export const useDeleteShopRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id) => deleteShopRoom(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};
