import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "./redux/store";
import App from "./App.jsx";
import "modern-normalize/modern-normalize.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          padding: "16px",
        },

        iconTheme: {
          primary: "var(--color-accent-primary)",
          secondary: "var(--color-surface)",
        },

        loading: {
          iconTheme: {
            primary: "var(--color-accent-primary)",
            secondary: "var(--color-border)",
          },
        },

        error: {
          iconTheme: {
            primary: "var(--color-cancel)",
            secondary: "var(--color-surface)",
          },
        },
      }}
    />
  </React.StrictMode>
);
