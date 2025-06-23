import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout, thunkLogin } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const closeMenu = () => setShowMenu(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: "demo@aa.io",
      password: "password"
    };

    const res = await dispatch(thunkLogin(demoCredentials));

    if (res?.errors) {
      setErrors(res.errors);
    } else if (!res) {
      setErrors(["Something went wrong."]);
    } else {
      closeMenu();
    }
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              {errors.length > 0 && (
                <li className="error">
                  {errors.map((err, idx) => (
                    <div key={idx}>{err}</div>
                  ))}
                </li>
              )}
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <li>
                <button onClick={handleDemoLogin}>Demo User</button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}
export default ProfileButton;
