import { useTodoContext } from "../Store/Store";
import { account } from "../appWrite";
// import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useTodoContext();
  // const navigate = useNavigate();
  const handleLogout = async () => {
    await account.deleteSessions();
    setUser(null);
  };
  if (!user) return;
  return (
    <header>
      <h2 className="username">{user?.name}</h2>
      <button onClick={handleLogout} className="logout--btn">
        Logout
      </button>
    </header>
  );
}
