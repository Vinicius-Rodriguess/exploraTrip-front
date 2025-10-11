// src/services/userService.ts
export interface CreateUserDTO {
  name?: string | null;
  emailVal?: string | null;
  password?: string | null;
}

export interface LoginUserDTO {
  email?: string | null;
  password?: string | null;
}

export interface UpdatePasswordDTO {
  email?: string | null;
  password?: string | null;
  oldPassword?: string | null;
}

export interface ConfirmUserCodeDTO {
  email?: string | null;
  code?: number | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const registerUser = async (data: CreateUserDTO) => {
  const res = await fetch(`${BASE_URL}/User`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao cadastrar usuário");
  }

  return res.json();
};

export const confirmCode = async (id: string, data: ConfirmUserCodeDTO) => {
  const res = await fetch(`${BASE_URL}/User/confirmCode/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao confirmar código");
  return res.json();
};

export const forgotPassword = async (email: string, data: CreateUserDTO) => {
  const res = await fetch(`${BASE_URL}/User/forgotPassword/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao solicitar redefinição de senha");
  return res.json();
};

export const loginUser = async (data: LoginUserDTO) => {
  const res = await fetch(`${BASE_URL}/User/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao logar usuário");
  return res.json();
};

export const resetPassword = async (data: UpdatePasswordDTO) => {
  const res = await fetch(`${BASE_URL}/User/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao resetar senha");
  return res.json();
};

export const updateUser = async (id: string, data: UpdatePasswordDTO) => {
  const res = await fetch(`${BASE_URL}/User/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
};

export const activateUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/User/activeUser/${id}`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Erro ao ativar usuário");
  return res.json();
};

export const isActive = async (id: string) => {
  const res = await fetch(`${BASE_URL}/User/isActive/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Erro ao verificar status");
  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/User/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar usuário");
  return res.json();
};


export const userService = {
  registerUser,
  confirmCode,
  forgotPassword,
  loginUser,
  resetPassword,
  updateUser,
  activateUser,
  isActive,
  deleteUser,
};
