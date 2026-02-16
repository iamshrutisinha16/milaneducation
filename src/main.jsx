import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="601784931771-190n8hdisb0crckht1g3v26aml6pntlc.apps.googleusercontent.com">
    <App />
   </GoogleOAuthProvider>
  </React.StrictMode>
);
