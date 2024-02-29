import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../Store/Store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../Components/Spinner";

export default function LoginPage() {
  const { handleLogin, setShowPass, showPass, loading } = useTodoContext();
  const [loginInfo, setLoginInfo] = useState<login>({
    email: "",
    pass: "",
  });

  // useEffect(() => {
  //   getSession();
  // }, []);
  if(loading) return <Spinner margin="0 0" />
  return (
    <div className="authentication--wrapper login--wrapper">
      <h1>Login</h1>
      <form onSubmit={(e) => handleLogin(e, loginInfo)}>
        <div className="input--container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            value={loginInfo.email}
          />
        </div>
        <div className="input--container">
          <label htmlFor="password">Password</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, pass: e.target.value })
            }
            value={loginInfo.pass}
          />
          <button
            type="button"
            onClick={() => setShowPass((prev: boolean) => !prev)}
            className="showpass--btn"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="form--btn" type="submit">
          Login
        </button>
      </form>
      <p className="link--text">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}
