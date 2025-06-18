import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import EndScreen from "./pages/EndScreen";

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
        <Route path="/deathscreen" element={<EndScreen />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}
