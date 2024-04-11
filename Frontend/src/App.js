//import logo from "./logo.png";
import "./App.css";
import Signup from "./pages/Signup";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeRoutes } from "./routes";
function App() {
  document.title = "Doctobobo";
  return (
    <Router>
      <ThemeRoutes />
    </Router>
  );
}

export default App;
