import "./styles/App.css";
import HomePage from "./Pages/HomePage/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import LoginPage from "./Pages/LoginPage/loginPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
