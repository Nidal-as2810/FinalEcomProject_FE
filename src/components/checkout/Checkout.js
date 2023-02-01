import React from "react";
import classes from "./Checkout.module.css";

import image from "../../assets/logo.png";

function Checkout() {
  return (
    <div className={classes.checkout}>
      <h2 className={`${classes.header} upper`}>no money needed!</h2>
      <div className={`${classes.coins}`}>
        <div
          className={`${classes.img} ${classes.first}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.second}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.third}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fourth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fifth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className={`${classes.coins} ${classes.coinsB}`}>
        <div
          className={`${classes.img} ${classes.first}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.second}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.third}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fourth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fifth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className={`${classes.coins} ${classes.coinsC}`}>
        <div
          className={`${classes.img} ${classes.first}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.second}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.third}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fourth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`${classes.img} ${classes.fifth}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
}

export default Checkout;
