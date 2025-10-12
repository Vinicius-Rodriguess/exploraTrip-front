"use client";
import { useState, useEffect } from "react";
import { userService } from "@/services/userService";

interface User {
  id: string;
  name: string;
  emailVal: string;
  token?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await userService.loginUser({ email, password });
    const userData = {
      id: data.id,
      name: data.name,
      emailVal: data.emailVal,
      token: data.token,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = async (name: string, emailVal: string, password: string) => {
    await userService.registerUser({ name, emailVal, password });
  };

  const verifyEmail = async (code: string) => {
    if (!user?.id) throw new Error("Usuário não encontrado na sessão");

    await userService.confirmCode(user.id, {
      email: user.emailVal,
      code: Number(code),
    });
  };

  const resetPassword = async (payload: { oldPassword: string; newPassword: string }) => {
    await userService.resetPassword(payload);
  };

  const forgotPassword = async (email: string, data: { password: string }) => {
    await userService.forgotPassword(email, data);
  };

  return {
    user,
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    forgotPassword,
  };
}
