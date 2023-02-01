import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./Navbar.module.css";

import useAuth from "../../hooks/useAuth";
import useGlobal from "../../hooks/useGlobal";
import useFavourites from "../../hooks/useFavourites";
import { getAllCategories } from "../../api/apiUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartPlus,
  faHeart,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";

import { languages, currentLang } from "../../utils/directionUtils";

function Navbar(props) {
  const navigate = useNavigate();
  const toLocation = "/category";

  const [categories, setCategories] = useState([]);

  const { auth, setAuth } = useAuth();
  const { cart } = useGlobal();
  const { favourite } = useFavourites();

  const currentLanguage = currentLang();

  const [t, i18n] = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.direction;
  }, [currentLanguage]);

  useEffect(() => {
    const myAuth = localStorage.getItem("marketAuth");
    if (myAuth !== null) {
      setAuth(JSON.parse(myAuth));
    }
  }, [setAuth]);

  useEffect(() => {
    let categoryList;
    async function fetchData() {
      categoryList = await getAllCategories();
      setCategories(categoryList);
    }
    fetchData();
  }, []);

  const handleCategoryShow = (sub) => {
    localStorage.setItem("category", JSON.stringify(sub));
    props.changeCategory(sub);
    navigate(toLocation, { replace: true });
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.topNav}>
        <div className={`${classes.logo} upper`}>
          <div className={classes.img}></div>
          <Link className={classes.title} to="/">
            Click <span className={classes.span}>&</span> Collect
          </Link>
        </div>
        <form className={classes.searchContainer}>
          <span className={`${classes.searchLabel} capitalize`}>
            {t("navbar.search")}
          </span>
          <input type="text" className={classes.search} id="search" />
          <FontAwesomeIcon icon={faSearch} className={classes.searchIcon} />
        </form>
        {!auth.token ? (
          <ul className={`${classes.register} capitalize`}>
            <li className={classes.registerItem}>
              <Link className={classes.link} to="/signup">
                {t("navbar.signup")}
              </Link>
            </li>
            <li className={classes.registerItem}>
              <Link className={classes.link} to="/signin">
                {t("navbar.signin")}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={`${classes.register} capitalize`}>
            <li
              className={`${classes.registerItem} ${
                cart.items?.length > 0 ? "" : "hide"
              }`}
            >
              <Link className={classes.link} to="/cart">
                <FontAwesomeIcon icon={faCartPlus} className={classes.fav} />
                <span className={`${classes.favNum} number-font `}>
                  {cart.items?.length > 0 ? cart.items.length : ""}
                </span>
              </Link>
            </li>
            <li
              className={`${classes.registerItem} ${
                favourite?.length > 0 ? "" : "hide"
              }`}
            >
              <Link className={classes.link} to="/favourite">
                <FontAwesomeIcon icon={faHeart} className={classes.fav} />
                <span className={`${classes.favNum} number-font`}>
                  {favourite?.length > 0 ? favourite.length : ""}
                </span>
              </Link>
            </li>
            <li className={`${classes.profile} upper `}>
              ns
              <ul
                className={`${classes.profileList} ${
                  currentLanguage.direction === "ltr"
                    ? classes.profileListLeft
                    : classes.profileListRight
                }`}
              >
                <li className={classes.profileListItem}>
                  <Link className={classes.link} to="/profile">
                    {t("navbar.profile")}
                  </Link>
                </li>
                <li className={classes.profileListItem}>
                  <Link className={classes.link} to="/cart">
                    {t("navbar.cart")}
                  </Link>
                </li>
                <li className={classes.profileListItem}>
                  <Link className={classes.link} to="/orders">
                    {t("navbar.orders")}
                  </Link>
                </li>
                <li className={classes.profileListItem}>
                  <Link className={classes.link} to="/favourite">
                    {t("navbar.favourite")}
                  </Link>
                </li>
                <li className={classes.profileListItem}>
                  <Link className={classes.link} to="/messages">
                    {t("navbar.messages")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>
      <div className={classes.bottomNav}>
        <ul className={classes.categories}>
          {categories.map((category) => {
            return (
              <li
                className={`${classes.category} capitalize`}
                key={category.id}
              >
                {category.name}
                <ul
                  className={`${classes.subCategory} ${
                    currentLanguage.direction === "ltr"
                      ? classes.subCategoryLeft
                      : classes.subCategoryRight
                  }`}
                >
                  {category.subs.map((sub) => {
                    return (
                      <li
                        key={sub.id}
                        className={classes.subCategoryItem}
                        onClick={() => {
                          handleCategoryShow(sub);
                        }}
                      >
                        <span className={classes.link}>{sub.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className={classes.utils}>
          <div className={classes.utilItem}>
            <FontAwesomeIcon icon={faGlobeAsia} />
            <ul
              className={`${classes.utilSelect} ${
                currentLanguage.direction === "ltr"
                  ? classes.utilSelectLeft
                  : classes.utilSelectRight
              }`}
            >
              {languages.map((language) => {
                return (
                  <li
                    key={language.code}
                    className={classes.utilOption}
                    onClick={() => {
                      i18n.changeLanguage(language.code);
                    }}
                  >
                    {language.name}

                    <span className={classes.utilOptionSpan}>
                      {language.code}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
