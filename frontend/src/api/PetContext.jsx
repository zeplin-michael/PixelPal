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
  //pets is an array of objects
  const [pets, setPets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets from backend
  const fetchPets = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPets(data);
        // console.log("pet fetched", data);
      } else {
        setPets(null);
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

    fetchPets();
    const interval = setInterval(fetchPets, 5000);

    return () => clearInterval(interval);
  }, [fetchPets, token]);

  // Expose pet, loading, error, and a manual refresh
  const value = { pets, setPets, loading, error, refreshPets: fetchPets };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet() {
  return useContext(PetContext);
}
