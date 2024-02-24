import { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
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
        <button className="submit--btn--2" type="submit">
          Submit
        </button>
      </form>
      <p className="link--text">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}
