// src/hooks/useTrip.ts
import { useState } from "react";
import { tripService, TripDTO } from "@/services/tripService";

export function useTrip() {
  const [trips, setTrips] = useState<TripDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const createTrip = async (trip: TripDTO) => {
    setLoading(true);
    try {
      const newTrip = await tripService.createTrip(trip);
      setTrips((prev) => [...prev, newTrip]);
      return newTrip;
    } finally {
      setLoading(false);
    }
  };

  const getTrip = async (id: string) => {
    setLoading(true);
    try {
      return await tripService.getTrip(id);
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (id: string, trip: TripDTO) => {
    setLoading(true);
    try {
      const updated = await tripService.updateTrip(id, trip);
      setTrips((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    setLoading(true);
    try {
      await tripService.deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return {
    trips,
    loading,
    createTrip,
    getTrip,
    updateTrip,
    deleteTrip,
  };
}
