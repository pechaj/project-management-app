import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/app";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root container not found");
}
