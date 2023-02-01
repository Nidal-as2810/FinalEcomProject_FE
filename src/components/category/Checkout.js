import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { currentLang } from "../../utils/directionUtils";
import classes from "./Checkout.module.css";

import { orderCheckout, getUserClosedOrders } from "../../api/apiUtils";
import useGlobal from "../../hooks/useGlobal";
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";

function Checkout(props) {
  const navigate = useNavigate();
  const toLocation = "/checkout";

  const { setCart } = useGlobal();
  const { auth } = useAuth();
  const { setOrders } = useOrder();

  const cart = props.cart;

  const total = new Intl.NumberFormat("en-IN").format(cart.total);
  const currentLanguage = currentLang();

  const [t] = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.direction;
  }, [currentLanguage]);

  const handleCheckout = async () => {
    await orderCheckout(cart.id, auth.token);
    const orders = await getUserClosedOrders(auth.user, auth.token);
    setCart({});
    setOrders(orders);
    navigate(toLocation, { replace: true });
  };
  return (
    <div className={classes.main}>
      <div className={classes.checkItem}>
        <p>
          {t("cart.total_items")}:{" "}
          <span
            className={`${
              currentLanguage.direction === "ltr"
                ? classes.numsLeft
                : classes.numsRight
            } number-font`}
          >
            {cart.items.length}
          </span>{" "}
        </p>
      </div>
      <div className={classes.checkItem}>
        <p>
          {t("cart.subtotal")}:{" "}
          <span
            className={`${
              currentLanguage.direction === "ltr"
                ? classes.numsLeft
                : classes.numsRight
            } number-font`}
          >
            $ {total}
          </span>
        </p>
      </div>
      <div className={classes.checkItem}>
        <p>
          {t("cart.shipping")}:
          <span
            className={`${
              currentLanguage.direction === "ltr"
                ? classes.numsLeft
                : classes.numsRight
            } number-font`}
          >
            $ 0
          </span>
        </p>
      </div>
      <div className={classes.checkItem}>
        <p>
          {t("cart.total")}:{" "}
          <span
            className={`${
              currentLanguage.direction === "ltr"
                ? classes.numsLeft
                : classes.numsRight
            } number-font`}
          >
            $ {total}
          </span>
        </p>
      </div>

      <button className={`${classes.button} upper`} onClick={handleCheckout}>
        {t("cart.checkout")}
      </button>
    </div>
  );
}

export default Checkout;
