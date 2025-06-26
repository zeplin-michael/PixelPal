import { usePet } from "../../api/PetContext";
import { useAuth } from "../../auth/AuthContext";
import "./ProfilePage.css";
import CreatePetForm from "./CreatePetForm";
import PetProfile from "./PetProfile";

export default function ProfilePage() {
  const { pet, loading, error } = usePet();
  const { token } = useAuth();

  if (error) return <div>Error: {error}</div>;

  if (!token) {
    return (
      <div className="profile-container">
        You are not logged in, please login to view your profile or create a
        pal!
      </div>
    );
    // If no pet, show create form
  }
  if (!pet) {
    return (
      <div className="profile-container">
        <h2>You don't have a pal yet!</h2>
        <CreatePetForm />
      </div>
    );
  }

  // If pet exists, show pet profile
  return (
    <div className="profile-container">
      <h2>Your Pet</h2>
      <PetProfile pet={pet} />
    </div>
  );
}
