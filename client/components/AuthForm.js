import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  let switchedName = "";
  let switchedLink = "";

  if (displayName === "Login") {
    switchedName = "Sign Up";
    switchedLink = "/signup";
  } else {
    switchedName = "Login";
    switchedLink = "/login";
  }

  return (
    <div className="content">
      <div className="auth-form">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" className="auth-field" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" className="auth-field" />
          </div>
          <div>
            <button type="submit" className="auth-submit">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <hr />
        <h3 className="auth-text">
          {displayName === "Login"
            ? "Don't have an account yet?"
            : "Already have an account?"}
        </h3>
        <div>
          <Link to={switchedLink}>
            <button className="auth-submit">{switchedName}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
