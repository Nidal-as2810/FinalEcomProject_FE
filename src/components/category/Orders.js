import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../global/Card";
import classes from "./Orders.module.css";

import useOrder from "../../hooks/useOrder";
import useInfo from "../../hooks/useInfo";

const OrderCard = (props) => {
  return (
    <div
      className={classes.orderCard}
      key={props.order.id}
      onClick={() => {
        props.handleClick(props.order.items);
      }}
    >
      <h3 className={`number-font `}>{props.order.date}</h3>
      <h3 className={`number-font `}>
        $ {new Intl.NumberFormat("en-IN").format(props.order.total)}
      </h3>
    </div>
  );
};

const ordersTotalSum = (orders) => {
  let total = 0;
  orders.forEach((order) => {
    total += order.total;
  });
  return total;
};
function Orders() {
  const [t] = useTranslation();
  const { orders } = useOrder();
  const { info } = useInfo();
  const [items, setItems] = useState([]);

  const handleOrderClick = (items) => {
    setItems(items);
  };
  return (
    <div className={classes.orders}>
      <div className={classes.sidenav}>
        <div className={classes.ordersList}>
          {orders.map((order) => {
            return (
              <OrderCard
                order={order}
                key={order.id}
                handleClick={handleOrderClick}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.list}>
        <ul className={classes.orderHeader}>
          <li className={classes.headerItem}>
            {t("orders.total_items")}:{" "}
            <span className={`number-font`}>{orders.length}</span>
          </li>
          <li className={classes.headerItem}>
            {t("orders.total")}:{" "}
            <span className={`number-font`}>$ {ordersTotalSum(orders)}</span>
          </li>
          <li className={classes.headerItem}>
            {t("orders.address")}: {info.address}
          </li>
          <li className={classes.headerItem}>
            {t("orders.city")}: {info.city}
          </li>
          <li className={classes.headerItem}>
            {t("orders.state")}: {info.state}
          </li>
          <li className={classes.headerItem}>
            {t("orders.phone")}: {info.phone}
          </li>
        </ul>
        <div className={classes.orderItems}>
          {items.map((item) => {
            return <Card item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
