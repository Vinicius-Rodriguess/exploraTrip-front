"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  emailVal: string;
  token?: string;
  isActive?: boolean;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const loginRequired = () => {
    if (!isLoading && !user) {
      toast.error("Você precisa estar logado para acessar esta página.");
      router.push("/");
    }
  };

  const login = async (email: string, password: string, keepConnected?: boolean) => {
    try {
      const response = await userService.loginUser({ email, password });

      if (!response.isSuccess || !response.data)
        return { success: false, message: response.message };

      const userData: User = {
        id: response.data.id,
        name: response.data.name,
        emailVal: email,
        token: response.data.token,
      };

      setUser(userData);
      if (keepConnected) 
        localStorage.setItem("user", JSON.stringify(userData));
      else 
        sessionStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor. Tente novamente mais tarde." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    router.push("/");
  };

  const register = async (name: string, emailVal: string, password: string) => {
    try {
      const response = await userService.registerUser({ name, emailVal, password });
      if (!response.isSuccess || !response.data)
        return { success: false, message: response.message };

      const userData: User = {
        id: response.data.id,
        name: response.data.userName,
        emailVal: response.data.email,
        isActive: response.data.isActive,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor. Tente novamente mais tarde." };
    }
  };

  const verifyEmail = async (code: string, operation: number) => {
    if (!user?.id) return { success: false, message: "Usuário não encontrado na sessão." };

    try {
      const response = await userService.confirmCode(operation, {
        email: user.emailVal,
        code: Number(code),
      });
      if (!response.isSuccess) return { success: false, message: response.message };

      const updatedUser = { ...user, isActive: true };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor. Tente novamente mais tarde." };
    }
  };

  const forgotPassword = async (email: string, data: { password: string }) => {
    try {
      const response = await userService.forgotPassword(email, data);

      if (!response.isSuccess) {
        return { success: false, message: response.message || "Falha ao redefinir senha." };
      }

      return { success: true, message: "Senha redefinida com sucesso!" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor. Tente novamente mais tarde." };
    }
  };

  const resetPassword = async (payload: { oldPassword: string; newPassword: string }) => {
    try {
      const response = await userService.resetPassword(payload);

      if (!response.isSuccess) {
        return { success: false, message: response.message || "Falha ao resetar senha." };
      }

      return { success: true, message: "Senha alterada com sucesso!" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro no servidor. Tente novamente mais tarde." };
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    register,
    verifyEmail,
    loginRequired,
    forgotPassword,
    resetPassword,
  };
}
