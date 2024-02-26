import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../Store/Store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { account } from "../appWrite";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { getSession, handleLogin, setShowPass, showPass } = useTodoContext();
  const [loginInfo, setLoginInfo] = useState<login>({
    email: "",
    pass: "",
  });
  console.log(window.location.origin);
  const handleGoogleAuth = () => {
    account.createOAuth2Session(
      "google",
      window.location.origin,
      window.location.origin + "/login"
      // "https://todo-app-appwrite-typescript.vercel.app/",
      // "https://todo-app-appwrite-typescript.vercel.app/login"
    );
  };
  useEffect(() => {
    return () => {
      getSession();
    };
  }, []);
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
        <button
          className="form--btn google--login"
          type="button"
          onClick={handleGoogleAuth}
        >
          <FcGoogle style={{ fontSize: "1.3rem" }} /> Google Login
        </button>
      </form>
      <p className="link--text">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}
