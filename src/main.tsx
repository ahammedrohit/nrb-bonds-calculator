import "@styles/calender.css";
import "@styles/custom.css";
import "@styles/hamburger.css";
import "@styles/pagination.css";
import "@styles/print.css";
import "@styles/scrollbar.css";
import "@styles/table.css";
import "@styles/tailwind.css";
import "@styles/tooltip.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
