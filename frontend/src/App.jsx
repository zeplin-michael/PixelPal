import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
<<<<<<< HEAD
import GamePage from "./pages/game-page/game-page";
import Bath from "./pages/game-page/components/bath";
import Bed from "./pages/game-page/components/bed";
import Meal from "./pages/game-page/components/meal";
=======
import Homepage from "./pages/Homepage";
import LearnMore from "./pages/LearnMore";
import Gallery from "./pages/Gallery";
import GamePage from "./pages/game-page/game-page";
import Bath from "./pages/game-page/components/bath";
import Bed from "./pages/game-page/components/bed";
import Meal from "./pages/game-page/components/meal";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>
      <Route path="/game-page" element={<GamePage />}>
        <Route path="/game-page/bath" element={<Bath />} />
        <Route path="/game-page/bed" element={<Bed />} />
        <Route path="/game-page/meal" element={<Meal />} />
      </Route>
    </Routes>
  );
}
