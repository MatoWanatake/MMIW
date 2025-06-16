import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <img src="/MMIWhand.jpg" alt="Logo" className="nav-logo" />

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        {currentUser && (
          <>
            <li><NavLink to="/stories">See Stories</NavLink></li>
            <li><NavLink to="/stories/new">Create Story</NavLink></li>
            <li><NavLink to={`/users/${currentUser.id}/following`}>Following</NavLink></li>
            <li><NavLink to={`/users/${currentUser.id}/followers`}>Followers</NavLink></li>
          </>
        )}
      </ul>

      <div className="profile-button">
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
