import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "../auth/AuthContext";
import { API } from "./ApiContext";

const PetContext = createContext();

export function PetProvider({ children }) {
  const { token } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pet from backend
  const fetchPet = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPet(data);
        // console.log("pet fetched", data);
      } else {
        setPet(null);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Poll for pet updates every 5 seconds
  useEffect(() => {
    if (!token) return;

    fetchPet();
    const interval = setInterval(fetchPet, 5000);

    return () => clearInterval(interval);
  }, [fetchPet, token]);

  // Expose pet, loading, error, and a manual refresh
  const value = { pet, setPet, loading, error, refreshPet: fetchPet };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet() {
  return useContext(PetContext);
}
