import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { legacy_createStore as configureStore } from "redux";
import UserTaskApp from "./store/taskStore.jsx";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore(UserTaskApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
