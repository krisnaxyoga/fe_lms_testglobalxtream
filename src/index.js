import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
// import { ThemeProvider, defaultTheme } from "@material-tailwind/react"; // Sesuaikan dengan impor tema yang sesuai

// Import BrowserRouter dari react-router-dom
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);