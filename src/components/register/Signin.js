import React, { useEffect, useReducer, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useGlobal from "../../hooks/useGlobal";
import useOrder from "../../hooks/useOrder";
import useInfo from "../../hooks/useInfo";
import axios from "../../api/axios";
import {
  getUserTempOrder,
  getUserClosedOrders,
  getUserInfoWithToken,
} from "../../api/apiUtils";
import { useTranslation } from "react-i18next";
import classes from "./Signup.module.css";
import { reducer } from "./registerUtils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const SIGNIN_URL = "/api/auth/authenticate";

function Signin() {
  const [t] = useTranslation();

  const userRef = useRef();

  const [isErorr, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location.state?.from?.pathname || "/";

  const { setCart } = useGlobal();
  const { setOrders } = useOrder();
  const { setInfo } = useInfo();

  const [state, dispatch] = useReducer(reducer, {
    username: "",
    userIsFocused: false,
    password: "",
    passwordIsFocused: false,
    userLabel: null,
    passLabel: null,
    matchLabel: null,
  });

  useEffect(() => {
    userRef.current.focus();
    dispatch({ type: "password", payload: null });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.username && state.password) {
      try {
        const response = await axios.post(
          SIGNIN_URL,
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
        const tempOrder = await getUserTempOrder(user, token);
        const orders = await getUserClosedOrders(user, token);
        const info = await getUserInfoWithToken(user, token);

        setAuth({ user, token });
        setCart(tempOrder);
        setOrders(orders);
        setInfo(info);
        localStorage.setItem("marketAuth", JSON.stringify({ user, token }));

        setError(false);
        navigate(fromLocation, { replace: true });
      } catch (err) {
        setError(true);
        if (!err?.response) {
          setErrorMessage("No Server Response! Check Connection.");
        } else if (err.response.status === 400) {
          setErrorMessage("Missing username or password.");
        } else if (err.response.status === 403) {
          setErrorMessage("Unauthorized");
        } else {
          setErrorMessage("Failed sign in.");
        }
      }
    }
  };

  return (
    <div className="container">
      <div className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div
            className={`${classes.error} ${
              !isErorr ? classes.hide : classes.show
            }`}
          >
            {errorMessage}
          </div>
          <h2 className={`${classes.title} upper`}>{t("signin.signin")}</h2>
          <div className={classes.item}>
            <label
              htmlFor="username"
              className={`${classes.label} capitalize`}
              style={state.userLabel}
            >
              {t("signin.username")}
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
          </div>
          <div className={classes.item}>
            <label
              htmlFor="pass"
              className={`${classes.label} capitalize`}
              style={state.passLabel}
            >
              {t("signin.password")}
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
          </div>

          <div className={classes.item}>
            <button
              className={
                !state.username || !state.password
                  ? classes.btnDisabled
                  : classes.btn
              }
              disabled={!state.username || !state.username ? true : false}
            >
              {t("signin.submit")}
            </button>
          </div>
          <p className={classes.signin}>
            {t("signin.need_an_account")}
            <Link to="/signup" className={classes.link}>
              {t("signin.signup")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
