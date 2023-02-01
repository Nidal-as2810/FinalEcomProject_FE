import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useGlobal from "../../hooks/useGlobal";
import useFavourites from "../../hooks/useFavourites";
import {
  addItemToCard,
  getUserTempOrder,
  addToFavourites,
  getFavouriteList,
  removeFromFavourite,
} from "../../api/apiUtils";

function Card(props) {
  const { auth } = useAuth();
  const { setCart } = useGlobal();
  const { setFavourite } = useFavourites();
  const [t] = useTranslation();
  const item = props.item;

  const handleAddToCard = async () => {
    const info = { itemId: item.id, qty: 1 };

    await addItemToCard(auth.user, info, auth.token);
    const tempOrder = await getUserTempOrder(auth.user, auth.token);

    setCart(tempOrder);
  };
  const handleAddRemoveToFavourite = async () => {
    const info = {
      itemId: item.id,
      username: auth.user,
    };
    console.log(item);
    if (item.setFavourite !== "ye favourite") {
      await addToFavourites(info, auth.token);
    } else {
      await removeFromFavourite(item.id, auth.token);
    }
    const favourites = await getFavouriteList(auth.user, auth.token);
    setFavourite(favourites);
  };
  return (
    <div className={classes.card} key={item.id}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>
      <h2 className={`${classes.title} upper`}>{item.name}</h2>
      <p className={classes.describtion}>{item.description}</p>
      <div className={classes.flex}>
        <div>
          {t("item.price")}: $ {item.price}
        </div>
        <div>
          {t("item.qty")}: {item.quantity} {item.unit}
        </div>
      </div>
      <div className={classes.flex}>
        <FontAwesomeIcon
          icon={faCartPlus}
          className={`${classes.icon}`}
          onClick={handleAddToCard}
        />
        <FontAwesomeIcon
          icon={faHeart}
          className={`${classes.icon} ${
            props.parent === "favourite" ? classes.hide : classes.show
          }`}
          onClick={handleAddRemoveToFavourite}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={`${classes.icon} ${
            props.parent === "favourite" ? classes.show : classes.hide
          }`}
        />
      </div>
    </div>
  );
}

export default Card;
