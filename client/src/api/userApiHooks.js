import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  verifyToken,
} from "../api/api";

export const useRegister = () => {

  return useMutation({
    mutationFn: (data) => registerUser(data)
  });
};

export const useLogin = () => {

  return useMutation({
    mutationFn: (data) => loginUser(data)
  });
};

export const useForgotPassword = () => {

  return useMutation({
    mutationFn: (data) => forgotPassword(data)
  });
};

export const useResetPassword = () => {

  return useMutation({
    mutationFn: (data) => resetPassword(data)
  });
};

export const useUserProfile = () => {

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile()
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUserProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useVerifyToken = () => {

  return useMutation({
    mutationFn: (token) => verifyToken(token)
  });
};
