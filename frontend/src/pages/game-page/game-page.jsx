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
