import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Carousel.module.css";

function Carousel(props) {
  const [t] = useTranslation();
  const items = props.items;
  const [item, setItem] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setItem(items[index]);
  }, []);

  const handleAfterArrowClick = () => {
    if (index === items.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setItem(items[index]);
  };

  const handleABeforeArrowClick = () => {
    if (index === 0) {
      setIndex(items.length - 1);
    } else {
      setIndex(index - 1);
    }
    setItem(items[index]);
  };

  return (
    <div className={classes.carousel}>
      <div className={classes.item}>
        <button
          className={`${classes.before} ${classes.arrow}`}
          onClick={handleABeforeArrowClick}
        >
          &lsaquo;
        </button>
        <button
          className={`${classes.after} ${classes.arrow}`}
          onClick={handleAfterArrowClick}
        >
          &rsaquo;
        </button>
        <div className={classes.info}>
          <h2 className={`${classes.title} capitalize`}>{item.name}</h2>
          <p className={classes.describtion}>{item.description}</p>
          <span className={`${classes.nums} capitalize`}>
            {t("item.price")}: $
            <span className={classes.numbers}>{item.price}</span>
          </span>
          <span className={`${classes.nums} capitalize`}>
            {t("item.qty")}:{" "}
            <span className={classes.numbers}>{item.quantity}</span>
            {`${item.unit}`}
          </span>
          <button className={`capitalize ${classes.buy}`}>
            {t("item.buy")}
          </button>
        </div>
        <div
          style={{ backgroundImage: `url(${item.image})` }}
          className={classes.imageContainer}
        ></div>
      </div>
    </div>
  );
}

export default Carousel;
