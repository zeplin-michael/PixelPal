import "../ProfilePage.css";
import AlivePetProfile from "./AlivePetProfile";
import DeadPetProfile from "./DeadPetProfile";
import StatsInfoModal from "./StatsInfoModal";
import { useSelectedPet } from "../../../api/SelectedPetContext";
import { useState, useEffect } from "react";

function PetProfile({ pet }) {
  const [showStatsInfo, setShowStatsInfo] = useState(false);
  const { setSelectedPet } = useSelectedPet();

  useEffect(() => {
    if (pet.dead) {
      setSelectedPet(null);
    }
  }, [pet.dead]);
  if (pet.dead) {
    return <DeadPetProfile pet={pet} />;
  }
  return (
    <>
      <AlivePetProfile pet={pet} onShowStats={() => setShowStatsInfo(true)} />
      {showStatsInfo && (
        <StatsInfoModal onClose={() => setShowStatsInfo(false)} />
      )}
    </>
  );
}

export default PetProfile;
