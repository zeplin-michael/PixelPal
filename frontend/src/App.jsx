import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Bath from "./pages/game-page/bathtime";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Bath />}>
        <Route index element={<p>Play Game</p>} />
        <Route path="/bathtime" element={<Bath />}></Route>
      </Route>
    </Routes>
  );
}
