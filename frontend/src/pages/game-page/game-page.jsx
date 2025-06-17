import { Outlet } from "react-router";
import "./game-page.css";

function GamePage() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <footer>
        <button>Left</button>
        <button>Center</button>
        <button>Right</button>
      </footer>
    </>
  );
}
export default GamePage;
