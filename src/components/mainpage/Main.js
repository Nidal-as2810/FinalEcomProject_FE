import React, { useEffect, useState } from "react";
import classes from "./Main.module.css";

import Carousel from "./Carousel";
import Section from "./Section";

import { getAllSubCategories, getAllItems } from "../../api/apiUtils";

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

const initialCategory = [
  {
    id: 0,
    name: "Click market",
    items: itemsList,
  },
];

const itemsForCarousel = (items) => {
  let list = items;
  var newList = [];
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * list.length);
    newList.push(list[index]);
    list.splice(index, 1);
  }
  return newList;
};

const randomList = () => {
  let list = [];

  for (let i = 0; i < 5; i++) {
    var num = Math.floor(Math.random() * 10);
    let exist = false;

    for (let n = 0; n < list.length; n++) {
      if (list[n] === num) {
        exist = true;
      }
    }
    if (!exist) {
      list.push(num);
    } else {
      i--;
    }
  }
  return list;
};

function Main() {
  const [carouselItems, setCarouselItems] = useState(itemsList);
  const [categoryList, setCategoryList] = useState(initialCategory);

  useEffect(() => {
    async function getData() {
      const itemList = await getAllItems();
      const subList = await getAllSubCategories();

      setCarouselItems(itemsForCarousel(itemList));
      const list = randomList().map((r) => {
        return subList[r];
      });
      setCategoryList(list);
    }
    getData();
  }, []);
  return (
    <div className={classes.main}>
      <Carousel items={carouselItems} />
      {categoryList.map((sub) => {
        return <Section category={sub} key={sub.id} />;
      })}
    </div>
  );
}

export default Main;
