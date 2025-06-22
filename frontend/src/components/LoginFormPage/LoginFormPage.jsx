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
    const result = await dispatch(thunkLogin({ email, password }));
    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal();
      navigate("/");
    }
  };

  const handleDemoLogin = async () => {
    const result = await dispatch(
      thunkLogin({ email: "demo@user.io", password: "password" })
    );
    if (result.errors) {
      setErrors(result.errors);
    } else {
      closeModal();
      navigate("/");
    }
  };

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

        <div className="row full">
          <button type="button" onClick={handleDemoLogin}>
            Log In as Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
