import { API } from "./ApiContext";
import { useAuth } from "../auth/AuthContext";
import { useCallback, useState } from "react";

/**
 * Custom hook to increment a pet's overall stat.
 * Returns: [incrementStat, loading, error]
 */
export default function useIncrementOverallStat(petId) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const incrementStat = useCallback(
    async (statColumn) => {
      if (!petId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/pet_overall_stats/${petId}/increment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ statColumn }),
        });
        if (!res.ok) {
          throw new Error(await res.text());
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [petId, token]
  );

  return [incrementStat, loading, error];
}
