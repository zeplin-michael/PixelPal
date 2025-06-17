import { Outlet } from "react-router";
import "./game-page.css";

function GamePage() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <div>
        <ul className="button-container">
          <li>
            <button className="button" onClick={() => {}}>
              Left
            </button>
          </li>
          <li>
            <button className="button" onClick={() => {}}>
              Center
            </button>
          </li>
          <li>
            <button className="button" onClick={() => {}}>
              Right
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
export default GamePage;
