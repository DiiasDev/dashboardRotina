import "./styles/App.css";
import HomePage from "./Pages/HomePage/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles/theme.css";
import "./styles/global-theme.css";
import LoginPage from "./Pages/LoginPage/loginPage";
import Navigation from "./Components/Navigation/navigation";
import Lembretes from "./Pages/Lembretes/lembretes";
import { ThemeProvider } from "./contexts/ThemeContext";
import Tasks from "./Pages/Tasks/tasks";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLoginPage && <Navigation />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Lembretes" element={<Lembretes />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
