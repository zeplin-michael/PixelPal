import "../ProfilePage.css";
import AlivePetProfile from "./AlivePetProfile";
import DeadPetProfile from "./DeadPetProfile";

function PetProfile({ pet }) {
  if (pet.dead) {
    return <DeadPetProfile pet={pet} />;
  }
  return <AlivePetProfile pet={pet} />;
}

export default PetProfile;
