// src/services/tripService.ts
export interface UserRoleDTO {
  userEmail: string;
  role: number;
}

export interface TripDTO {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  userRoles: UserRoleDTO[];
  budget: number;
  notes?: string[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const createTrip = async (data: TripDTO) => {
  const res = await fetch(`${BASE_URL}/Trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao criar viagem");
  }

  return res.json();
};

export const getTrip = async (id: string) => {
  const res = await fetch(`${BASE_URL}/Trip/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Erro ao buscar viagem");
  return res.json();
};

export const updateTrip = async (id: string, data: TripDTO) => {
  const res = await fetch(`${BASE_URL}/Trip/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar viagem");
  return res.json();
};

export const deleteTrip = async (id: string) => {
  const res = await fetch(`${BASE_URL}/Trip/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar viagem");
  return res.json();
};

export const tripService = {
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip,
};
