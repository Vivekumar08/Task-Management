import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import UserForm from "./components/UserForm";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route element={<UserForm />} path="/login" />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
