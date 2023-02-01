import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import classes from "./Signup.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import axios from "../../api/axios";
import { reducer } from "./registerUtils";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const SIGNUP_URL = "/api/auth/register";

function Signup() {
  const [t] = useTranslation();
  const userRef = useRef();

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location.state?.from?.pathname || "/";

  const [isErorr, setIsError] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    userIsValid: false,
    userIsFocused: false,
    password: "",
    passwordIsValid: false,
    passwordIsFocused: false,
    passMatch: "",
    passMatchIsValid: false,
    passMatchIsFocused: false,
    userLabel: null,
    passLabel: null,
    matchLabel: null,
  });

  useEffect(() => {
    userRef.current.focus();
    dispatch({ type: "password", payload: null });
  }, []);

  useEffect(() => {
    dispatch({ type: "validUser", payload: USER_REGEX.test(state.username) });
  }, [state.username]);

  useEffect(() => {
    dispatch({
      type: "validPassword",
      payload: PASSWORD_REGEX.test(state.password),
    });
    dispatch({
      type: "validMatch",
      payload: state.passMatch === state.password,
    });
  }, [state.passMatch, state.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.userIsValid && state.passwordIsValid && state.passMatchIsValid) {
      try {
        const response = await axios.post(
          SIGNUP_URL,
          JSON.stringify({
            username: state.username,
            password: state.password,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = state.username;
        const token = response?.data?.jwt;

        setAuth({ user, token });
        localStorage.setItem("marketAuth", JSON.stringify({ user, token }));
        navigate(fromLocation, { replace: true });
      } catch (err) {
        setIsError(true);
      }
    }
  };

  return (
    <div className="container">
      <div className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div
            className={`${classes.error} ${
              isErorr ? classes.show : classes.hide
            }`}
          >
            Some thing went wrong!
          </div>
          <h2 className={`${classes.title} upper`}>{t("signup.signup")}</h2>
          <div className={classes.item}>
            <label
              htmlFor="username"
              className={`${classes.label} capitalize`}
              style={state.userLabel}
            >
              {t("signup.username")}
              <FontAwesomeIcon
                icon={faCheck}
                className={state.userIsValid ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  state.userIsValid || !state.username
                    ? classes.hide
                    : classes.invalid
                }
              />
            </label>
            <input
              type="text"
              id="username"
              className={classes.input}
              ref={userRef}
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "username", payload: e.target.value })
              }
              onFocus={() => {
                dispatch({ type: "userFocus", payload: true });
              }}
              onBlur={() => {
                dispatch({ type: "userFocus", payload: false });
              }}
            />
            <p
              id="uidnote"
              className={`${
                state.userIsFocused && state.username && !state.userIsValid
                  ? classes.instructions
                  : classes.hide
              }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {t("signup.username_instructions")
                .split("@")
                .map((i) => {
                  return <p>{i}</p>;
                })}
            </p>
          </div>
          <div className={classes.item}>
            <label
              htmlFor="pass"
              className={`${classes.label} capitalize`}
              style={state.passLabel}
            >
              {t("signup.password")}
              <FontAwesomeIcon
                icon={faCheck}
                className={state.passwordIsValid ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  state.passwordIsValid || !state.password
                    ? classes.hide
                    : classes.invalid
                }
              />
            </label>
            <input
              id="pass"
              type="password"
              className={classes.input}
              value={state.password}
              onChange={(e) => {
                dispatch({ type: "password", payload: e.target.value });
              }}
              onFocus={() => {
                dispatch({ type: "passwordFocus", payload: true });
              }}
              onBlur={() => {
                dispatch({ type: "passwordFocus", payload: false });
              }}
            />
            <p
              id="pwdnote"
              className={
                state.passwordIsFocused &&
                state.password &&
                !state.passwordIsValid
                  ? classes.instructions
                  : classes.hide
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {t("signup.password_instructions")
                .split("@")
                .map((i) => {
                  return <p>{i}</p>;
                })}
            </p>
          </div>
          <div className={classes.item}>
            <label
              htmlFor="match"
              className={`${classes.label} capitalize`}
              style={state.matchLabel}
            >
              {t("signup.confirm")}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  state.passMatchIsValid && state.passMatch
                    ? classes.valid
                    : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  state.passMatchIsValid || !state.passMatch
                    ? classes.hide
                    : classes.invalid
                }
              />
            </label>
            <input
              type="password"
              id="match"
              className={classes.input}
              value={state.passMatch}
              onChange={(e) => {
                dispatch({ type: "match", payload: e.target.value });
              }}
              onFocus={() => {
                dispatch({ type: "matchFocus", payload: true });
              }}
              onBlur={() => {
                dispatch({ type: "matchFocus", payload: false });
              }}
            />
          </div>
          <div className={classes.item}>
            <button
              className={
                !state.userIsValid ||
                !state.passMatchIsValid ||
                !state.passwordIsValid
                  ? classes.btnDisabled
                  : classes.btn
              }
              disabled={
                !state.userIsValid ||
                !state.passMatchIsValid ||
                !state.passwordIsValid
                  ? true
                  : false
              }
            >
              {t("signup.submit")}
            </button>
          </div>
          <p className={classes.signin}>
            {t("signup.already_registered")}
            <Link to="/signin" className={classes.link}>
              {t("signup.signin")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
