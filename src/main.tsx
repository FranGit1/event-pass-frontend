import React from "react";
import ReactDOM from "react-dom/client";
import BuyerApp from "./BuyerApp.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { config } from "./config.ts";
import AdminApp from "./AdminApp.tsx";

if (config.isBuyerVersion) {
  document.title = "EVENT PASS Buyer";
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <AuthProvider>
        <BuyerApp />
      </AuthProvider>
    </React.StrictMode>
  );
} else if (config.isAdminVersion) {
  document.title = "EVENT PASS Admin";
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  );
}
