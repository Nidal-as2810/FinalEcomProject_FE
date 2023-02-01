import React, { useEffect, useState } from "react";
import Card from "../global/Card";
import classes from "./Category.module.css";
import { getItemsBySubcategory } from "../../api/apiUtils";

function Category(props) {
  const category = props.currentSub;

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const subItems = await getItemsBySubcategory(category.id);

      if (subItems != null) {
        setItems(subItems);
      }
    }
    getData();
  }, [category]);

  return (
    <div className={classes.category}>
      <h2 className={classes.title}>{category.name}</h2>
      <span className={classes.count}>165 products</span>
      <div className={classes.products}>
        {items.map((item) => {
          return <Card item={item} />;
        })}
      </div>
    </div>
  );
}

export default Category;
