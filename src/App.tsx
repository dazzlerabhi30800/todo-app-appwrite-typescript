import "./App.css";
import Header from "./Components/Header";
import { ModeToggle } from "./Components/ModeToggler";
import LoginPage from "./pages/LoginPage";
import RedirectPage from "./pages/RedirectPage";
import SignupPage from "./pages/SignupPage";
import TodosPage from "./pages/TodosPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Header />
      <ModeToggle />
      <Routes>
        <Route element={<RedirectPage />}>
          <Route path="/" element={<TodosPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </main>
  );
}

export default App;
