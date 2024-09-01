// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider className="flex flex-col items-center justify-center w-[90%] md:w-[450px]">
    <App />
  </NextUIProvider>
);
