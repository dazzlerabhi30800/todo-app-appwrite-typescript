import "./App.css";
import { ModeToggle } from "./Components/ModeToggler";
import LoginPage from "./pages/LoginPage";
import RedirectPage from "./pages/RedirectPage";
import SignupPage from "./pages/SignupPage";
import TodosPage from "./pages/TodosPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main>
        <ModeToggle />
        <Routes>
          <Route element={<RedirectPage />}>
            <Route path="/" element={<TodosPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
