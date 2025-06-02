import "./styles/App.css";
import HomePage from "./Pages/HomePage/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import "./styles/global-theme.css";
import LoginPage from "./Pages/LoginPage/loginPage";
import Navigation from "./Components/Navigation/navigation";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navigation />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
