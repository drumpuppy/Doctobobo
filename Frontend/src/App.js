import logo from "./logo.svg";
import "./App.css";
import Signup from "./pages/Signup";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeRoutes } from "./routes";
function App() {
  return (
    <Router>
      <ThemeRoutes />
    </Router>
  );
}

export default App;
