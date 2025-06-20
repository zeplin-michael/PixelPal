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
              navigate("/Gallery");
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
  );
}
export default GamePage;
