<<<<<<< HEAD
import { Outlet, useNavigate } from "react-router";
import "./game-page.css";

function GamePage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="pet-gallery-button-container">
          <button
            className="pet-gallery-button"
            onClick={() => {
              navigate("frontend/src/pages/Gallery.jsx");
            }}
          >
            <p>MyPets</p>
          </button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <ul className="button-container">
          <li>
            <button className="button" onClick={() => {}}>
              <p>Left</p>
            </button>
          </li>
          <li>
            <button className="button" onClick={() => {}}>
              <p>Center</p>
            </button>
          </li>
          <li>
            <button className="button" onClick={() => {}}>
              <p>Right</p>
            </button>
          </li>
        </ul>
      </div>
    </>
=======
import { Outlet } from "react-router";
import "./game-page.css";

function GamePage() {
  return (
    <div>
      <Outlet />
    </div>
>>>>>>> 6b90f0d (bed and bath pages added)
  );
}
export default GamePage;
