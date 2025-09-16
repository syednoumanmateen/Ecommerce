import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
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

export const useVerifyToken = () => {

  return useMutation({
    mutationFn: (token) => verifyToken(token)
  });
};
