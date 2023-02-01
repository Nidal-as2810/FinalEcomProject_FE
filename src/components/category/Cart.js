import React from "react";
import { useTranslation } from "react-i18next";

import classes from "./Cart.module.css";

import miniCardClasses from "../global/MiniCard.module.css";
import miniCardMiniSizeClasses from "../global/MiniCardMiniSize.module.css";

import MiniCard from "../global/MiniCard";
import Checkout from "./Checkout";

import useGlobal from "../../hooks/useGlobal";
import useItems from "../../hooks/useItems";

function Cart() {
  const { cart } = useGlobal();
  const { allItems } = useItems();

  const [t] = useTranslation();
  return (
    <div className={`${classes.cart} ${classes.grid}`}>
      <div className={`${classes.shopping} ${classes.grid}`}>
        <div className={classes.shoppingSection}>
          <h2 className={`${classes.title} capitalize`}>{t("cart.title")}</h2>
          <div className={classes.items}>
            {cart.item !== null ? (
              cart.items.map((item) => {
                return <MiniCard classes={miniCardClasses} item={item} />;
              })
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className={classes.checkout}>
          <Checkout cart={cart} />
        </div>
      </div>
      <div className={`${classes.decision} `}>
        <div className={classes.suggestion}>
          <MiniCard
            classes={miniCardMiniSizeClasses}
            item={allItems[Math.floor(Math.random() * allItems.length)]}
          />
          <MiniCard
            classes={miniCardMiniSizeClasses}
            item={allItems[Math.floor(Math.random() * allItems.length)]}
          />
          <MiniCard
            classes={miniCardMiniSizeClasses}
            item={allItems[Math.floor(Math.random() * allItems.length)]}
          />
          <MiniCard
            classes={miniCardMiniSizeClasses}
            item={allItems[Math.floor(Math.random() * allItems.length)]}
          />
          <MiniCard
            classes={miniCardMiniSizeClasses}
            item={allItems[Math.floor(Math.random() * allItems.length)]}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
