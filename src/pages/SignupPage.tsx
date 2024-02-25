import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../Store/Store";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [signInfo, setSignInfo] = useState<signup>({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
  });
  const { handleSignUp, showPass, setShowPass } = useTodoContext();

  return (
    <div className="authentication--wrapper signup--wrapper">
      <h1 className="auth--heading">SignUp</h1>
      <form onSubmit={(e) => handleSignUp(e, signInfo)}>
        <div className="input--container">
          <label htmlFor="name">Username</label>
          <input
            onChange={(e) => setSignInfo({ ...signInfo, name: e.target.value })}
            value={signInfo.name}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="input--container">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setSignInfo({ ...signInfo, email: e.target.value })
            }
            value={signInfo.email}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="input--container">
          <label htmlFor="password1">Password</label>
          <input
            onChange={(e) =>
              setSignInfo({ ...signInfo, pass1: e.target.value })
            }
            value={signInfo.pass1}
            type={showPass ? "text" : "password"}
            name="password1"
            id="password1"
          />
          <button
            type="button"
            onClick={() => setShowPass((prev: boolean) => !prev)}
            className="showpass--btn"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="input--container">
          <label htmlFor="password2">Confirm Password</label>
          <input
            onChange={(e) =>
              setSignInfo({ ...signInfo, pass2: e.target.value })
            }
            value={signInfo.pass2}
            type={showPass ? "text" : "password"}
            name="password2"
            id="password2"
          />
        </div>
        <button className="form--btn">Submit</button>
      </form>
      <p className="link--text">
        Already Registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
