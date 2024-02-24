import { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="authentication--wrapper signup--wrapper">
      <h1 className="auth--heading">SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="input--container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="input--container">
          <label htmlFor="password1">Password</label>
          <input type="password" name="password1" id="password1" />
        </div>
        <div className="input--container">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" id="password2" />
        </div>
        <button className="submit--btn--2" type="submit">
          Submit
        </button>
      </form>
      <p className="link--text">
        Already Registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
