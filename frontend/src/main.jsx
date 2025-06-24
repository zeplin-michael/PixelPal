import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ApiProvider } from "./api/ApiContext.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import "./index.css";
import { PetProvider } from "./api/PetContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <PetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PetProvider>
    </ApiProvider>
  </AuthProvider>
);
