import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Logging in with", email, password);
    const result = await dispatch(thunkLogin({ email, password }));
    // thunkLogin returns either user-data or error-object
    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal();
      navigate("/");
    }
  };

  // const quickLogin = async ({ email, password }) => {
  //   // we still need to prevent the form submission
  //   const fakeEvent = { preventDefault: () => {} };
  //   await handleSubmit({ ...fakeEvent, target: null }, email, password);
  // };

  return (
    <div className="login-form-modal">
      <h2>Welcome Back!</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="row full">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
