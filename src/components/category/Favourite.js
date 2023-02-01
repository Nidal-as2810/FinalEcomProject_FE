import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../global/Card";
import classes from "./Favourite.module.css";

function Favourite() {
  const [t, i18n] = useTranslation();
  return (
    <div className={classes.favourite}>
      <h2 className={classes.title}>{t("navbar.favourite")}</h2>
      <span className={`${classes.count} number-font`}>
        165 {t("navbar.items")}
      </span>
      <div className={classes.items}>
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
        <Card parent={"favourite"} />
      </div>
    </div>
  );
}

export default Favourite;
