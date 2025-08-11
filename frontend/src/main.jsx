import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnHover
              draggable
              className="z-[9999]"
              toastClassName="custom-toast"
            />
            <App />
          </Provider>
        </QueryClientProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
