import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShopRooms,
  getShopRoomById,
  addShopRoom,
  updateShopRoom,
  deleteShopRoom,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";

export const useShopRooms = (filters = {}) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["shoproom", filters],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getShopRooms(filters);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useShopRoom = (id) => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["shoproom", id],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getShopRoomById(id);
      } finally {
        setLoading(false);
      }
    },
    enabled: !!id,
  });
};

export const useAddShopRoom = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await addShopRoom(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};

export const useUpdateShopRoom = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      setLoading(true);;
      try {
        return await updateShopRoom(id, data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};

export const useDeleteShopRoom = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (id) => {
      setLoading(true);;
      try {
        return await deleteShopRoom(id);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoproom"] });
    },
  });
};
