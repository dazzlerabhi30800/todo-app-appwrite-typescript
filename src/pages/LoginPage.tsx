import { FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { account } from "../appWrite";
import { FcGoogle } from "react-icons/fc";
import { useTodoContext } from "../Store/Store";

export default function LoginPage() {
  const { getSession } = useTodoContext();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleLogin = async () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:5173/",
      "http://localhost:5173/login",
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
      <form onSubmit={handleSubmit}>
        <div className="input--container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="input--container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button className="form--btn" type="submit">
          Login
        </button>
        <button
          onClick={handleLogin}
          type="button"
          className="form--btn google--login"
        >
          <FcGoogle
            style={{ fontSize: "clamp(1.3rem, 1.2vw + 5px, 1.6rem)" }}
          />{" "}
          Login with Google
        </button>
      </form>
      <p className="link--text">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}
