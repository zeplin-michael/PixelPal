import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import EndScreen from "./pages/EndScreen";
// <<<<<<< HEAD
import GamePage from "./pages/game-page/game-page";
import Bath from "./pages/game-page/components/bath";
import Bed from "./pages/game-page/components/bed";
import Meal from "./pages/game-page/components/meal";
// =======
import Homepage from "./pages/Homepage";
import LearnMore from "./pages/LearnMore";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
