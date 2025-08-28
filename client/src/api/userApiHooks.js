import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from "../api/api";
import { useLoading } from "../context/LoadingContext";

export const useRegister = () => {
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await registerUser(data);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useLogin = () => {
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await loginUser(data);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useForgotPassword = () => {
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await forgotPassword(data);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useResetPassword = () => {
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await resetPassword(data);
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useUserProfile = () => {
  const { setLoading } = useLoading();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      setLoading(true);;
      try {
        return await getUserProfile();
      } finally {
        setLoading(false);
      }
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  return useMutation({
    mutationFn: async (data) => {
      setLoading(true);;
      try {
        return await updateUserProfile(data);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};
