import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// document.addEventListener("scroll", (event) => {
//   console.log(`scrollTop: ${window.document.scrollTop}`);
// });

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="navbar">
    <div>
      {isLoggedIn ? (
        <div className="navbar-nav">
          <div className="nav-left">
            {/* The navbar will show these links after you log in */}
            <Link to="/" className="nav-link">
              <img id="logo" src="/images/logo.png" />
              <span className="link-text">Home</span>
            </Link>
            <Link to="/products" className="nav-link">
              <FontAwesomeIcon icon={["fad", "rocket-launch"]} />
              <span className="link-text">Products</span>
            </Link>
          </div>
          <div className="nav-right">
            {isAdmin ? (
              <Link to="/admin-portal" className="nav-link">
                <FontAwesomeIcon icon={["fad", "solar-system"]} />
                <span className="link-text">Admin Portal</span>
              </Link>
            ) : (
              <Link to="/cart" className="nav-link">
                <FontAwesomeIcon icon={["fad", "shopping-cart"]} />
                <span className="link-text">Cart</span>
              </Link>
            )}
            <a className="nav-link" href="#" onClick={handleClick}>
              <FontAwesomeIcon icon={["fad", "sign-out"]} />
              <span className="link-text">Logout</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="navbar-nav">
          {/* The navbar will show these links before you log in */}
          <div className="nav-left">
            <Link to="/" className="nav-link">
              <img id="logo" src="/images/logo.png" />
              <span className="link-text">Home</span>
            </Link>
            <Link to="/products" className="nav-link">
              <FontAwesomeIcon icon={["fad", "rocket-launch"]} />
              <span className="link-text">Products</span>
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/cart" className="nav-link">
              <FontAwesomeIcon icon={["fad", "shopping-cart"]} />
              <span className="link-text">Cart</span>
            </Link>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={["fad", "user-astronaut"]} />
              <span className="link-text">Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
