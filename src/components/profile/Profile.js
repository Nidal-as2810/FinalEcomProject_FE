import React, { useReducer, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { updateUserInfo, getUserInfoWithToken } from "../../api/apiUtils";

import { useTranslation } from "react-i18next";
import { currentLang } from "../../utils/directionUtils";
import classes from "./Profile.module.css";

import { reducer } from "./profileUtils";

function Profile() {
  const { auth } = useAuth();
  const [t] = useTranslation();
  const currentLanguage = currentLang();

  const [state, dispatch] = useReducer(reducer, {
    firstname: "",
    firstnameIsFocused: false,
    firstnameLabel: null,
    lastname: "",
    lastnameIsFocused: false,
    lastnameLabel: null,
    email: "",
    emailIsFocused: false,
    emailLabel: null,
    phone: "",
    phoneIsFocused: false,
    phoneLabel: null,
    city: "",
    cityIsFocused: false,
    cityLabel: null,
    country: "",
    countryIsFocused: false,
    countryLabel: null,
    address: "",
    addressIsFocused: false,
    addressLabel: null,
  });

  useEffect(() => {
    async function getUserInfo() {
      const info = await getUserInfoWithToken(auth.user, auth.token);
      console.log(info);
      if (info !== null) {
        dispatch({ type: "firstname", payload: info.firstname });
        dispatch({ type: "lastname", payload: info.lastname });
        dispatch({ type: "email", payload: info.email });
        dispatch({ type: "country", payload: info.state });
        dispatch({ type: "city", payload: info.city });
        dispatch({ type: "phone", payload: info.phone });
        dispatch({ type: "address", payload: info.address });
      }
    }
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.token);
    const info = {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      state: state.country,
      city: state.city,
      phone: state.phone,
      address: state.address,
      username: auth.user,
    };
    console.log(info);
    updateUserInfo(info, auth.token);
  };

  return (
    <div className={classes.profile}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={`${classes.title} upper`}>{t("profile.profile")}</h2>
        <div className={classes.item}>
          <label
            htmlFor="firstname"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.firstnameLabel}
          >
            {t("profile.firstname")}
          </label>
          <input
            type="text"
            id="firstname"
            className={classes.input}
            value={state.firstname}
            ref={userRef}
            onChange={(e) => {
              dispatch({ type: "firstname", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "firstnameFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "firstnameFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="lastname"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.lastnameLabel}
          >
            {t("profile.lastname")}
          </label>
          <input
            type="text"
            id="lastname"
            className={classes.input}
            value={state.lastname}
            onChange={(e) => {
              dispatch({ type: "lastname", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "lastnameFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "lastnameFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="email"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.emailLabel}
          >
            {t("profile.email")}
          </label>
          <input
            type="email"
            id="email"
            className={classes.input}
            value={state.email}
            onChange={(e) => {
              dispatch({ type: "email", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "emailFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "emailFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="state"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.countryLabel}
          >
            {t("profile.state")}
          </label>
          <input
            type="text"
            id="state"
            className={classes.input}
            value={state.country}
            onChange={(e) => {
              dispatch({ type: "country", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "countryFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "countryFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="city"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.cityLabel}
          >
            {t("profile.city")}
          </label>
          <input
            type="text"
            id="city"
            className={classes.input}
            value={state.city}
            onChange={(e) => {
              dispatch({ type: "city", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "cityFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "cityFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="phone"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.phoneLabel}
          >
            {t("profile.phone")}
          </label>
          <input
            type="text"
            id="phone"
            className={classes.input}
            value={state.phone}
            onChange={(e) => {
              dispatch({ type: "phone", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "phoneFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "phoneFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <label
            htmlFor="address"
            className={`${classes.label} capitalize ${
              currentLanguage.direction === "rtl" ? classes.rtl : classes.ltr
            }`}
            style={state.addressLabel}
          >
            {t("profile.address")}
          </label>
          <input
            type="text"
            id="address"
            className={classes.input}
            value={state.address}
            onChange={(e) => {
              dispatch({ type: "address", payload: e.target.value });
            }}
            onFocus={() => {
              dispatch({ type: "addressFocus", payload: true });
            }}
            onBlur={() => {
              dispatch({ type: "addressFocus", payload: false });
            }}
          />
        </div>
        <div className={classes.item}>
          <button className={classes.btn}>{t("profile.save")}</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
