import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useGlobal from "../../hooks/useGlobal";
import {
  getUserTempOrder,
  removeItemfromCard,
  updateUserInfo,
} from "../../api/apiUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTimesCircle,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

const logo =
  "https://w7.pngwing.com/pngs/834/186/png-transparent-boot-shoe-cartoon-cartoon-boots-cartoon-character-photography-cartoon-arms.png";

const hide = {
  display: "none",
};
const show = {
  display: "block",
};

function MiniCard(props) {
  const { auth } = useAuth();
  const { cart, setCart } = useGlobal();
  const [item, setItem] = useState({});
  const [image, setImage] = useState(logo);

  // const [quantity,setQuantity]=useState()
  const classes = props.classes;
  useEffect(() => {
    setItem(props.item);
    setImage(item.image);
  }, [item, props.item]);

  const handleQtyChange = async (qty) => {
    const info = {
      item_id: item.itemId,
      qty,
      price: item.price,
      total: item.total,
      order_id: cart.id,
    };
    await updateUserInfo(auth.user, info, auth.token);
    const tempOrder = await getUserTempOrder(auth.user, auth.token);

    setCart(tempOrder);
  };

  const handleDeleteFromCard = async () => {
    await removeItemfromCard(
      item.id,

      auth.token
    );
    const tempOrder = await getUserTempOrder(auth.user, auth.token);

    setCart(tempOrder);
  };

  const [display, setDisplay] = useState(hide);

  return (
    <>
      {item != null ? (
        <div className={classes.miniCard} key={item.id}>
          <div className={`${classes.zoom} `} style={display}>
            <div
              className={classes.zoomedImage}
              style={{ backgroundImage: `url(${image ? image : logo})` }}
            >
              <FontAwesomeIcon
                className={classes.close}
                icon={faTimesCircle}
                onClick={() => {
                  setDisplay(hide);
                }}
              />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${image ? image : logo})` }}
            className={classes.image}
            onClick={() => {
              setDisplay(show);
            }}
          ></div>
          <div className={classes.details}>
            <h2 className={`${classes.title} capitalize`}>{item.name}</h2>
            <p className={`${classes.detail} capitalize`}>{item.description}</p>
            <div className={classes.actions}>
              <div className={classes.action}>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className={`${classes.quantity} `}
                  value={item.qty}
                  onChange={(e) => {
                    handleQtyChange(e.target.value);
                  }}
                />
                <span className={classes.norm}>{item.unit}</span>
              </div>
              <FontAwesomeIcon
                className={`${classes.action} ${classes.icon} ${classes.norm}`}
                icon={faTrashAlt}
                onClick={handleDeleteFromCard}
              />
              <FontAwesomeIcon
                className={`${classes.action} ${classes.icon} ${classes.mini}`}
                icon={faCartPlus}
              />
            </div>
          </div>
          <div className={`${classes.price} number-font`}>$ {item.price}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default MiniCard;
