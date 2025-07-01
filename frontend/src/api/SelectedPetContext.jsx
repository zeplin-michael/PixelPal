import { createContext, useContext, useState } from "react";

const SelectedPetContext = createContext();

export function SelectedPetProvider({ children }) {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <SelectedPetContext.Provider value={{ selectedPet, setSelectedPet }}>
      {children}
    </SelectedPetContext.Provider>
  );
}

export function useSelectedPet() {
  return useContext(SelectedPetContext);
}
