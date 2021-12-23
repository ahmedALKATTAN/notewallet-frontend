import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import { AuthContextProviderData } from "./store of browser provider/auth-context";
ReactDOM.render(
  <AuthContextProviderData>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProviderData>,
  document.getElementById("root")
);
