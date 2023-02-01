import React, { useState, useRef, useEffect } from "react";
import classes from "./Section.module.css";
import { motion } from "framer-motion";

import { getItemsBySubcategory } from "../../api/apiUtils";
import useItems from "../../hooks/useItems";
import Card from "../global/Card";

import itemImg from "../../assets/logo.png";
const itemsList = [
  {
    id: 1,
    title: "Click Market",
    describtion: "comfort, easy and great. click and get",
    price: 0,
    quantity: 0,
    unit: "",
    image: itemImg,
  },
];

function Section(props) {
  const category = props.category;
  const [items, setItems] = useState(itemsList);
  const { setAllItems } = useItems();

  useEffect(() => {
    async function getItems() {
      const itemList = await getItemsBySubcategory(category.id);

      setItems(itemList);
      setAllItems(itemList);
    }
    getItems();
  }, [category.id, setAllItems]);

  const [width, setWidth] = useState(0);
  const slider = useRef();
  useEffect(() => {
    setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  }, []);

  return (
    <div
      className={`${classes.section} ${category.id > 5 ? "" : classes.hide}`}
      key={category.id}
    >
      <h2 className={`${classes.title} upper`}>{category.name}</h2>
      <motion.div ref={slider} className={classes.cards}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className={classes.slider}
          whileTap={{ cursor: "grabbing" }}
        >
          {items.map((item) => {
            return <Card item={item} />;
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Section;
