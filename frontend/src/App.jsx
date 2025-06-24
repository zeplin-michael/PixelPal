import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import EndScreen from "./pages/deathscreen/EndScreen";

import Homepage from "./pages/Homepage";

import Gallery from "./pages/Gallery";
import PalLayout from "./pages/PalLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";



import Credits from "./pages/Credits";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deathscreen" element={<EndScreen />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pal" element={<PalLayout />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="credits" element={<Credits />} />
      </Route>
    </Routes>
  );
}
