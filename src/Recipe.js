import React from "react";
import style from "./recipe.module.css";

function ListItem(props) {
  return <li>{props.value}</li>;
}

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.card}>
      <h1 className={style.title}>{title}</h1>
      <p>Calories: {calories.toFixed(0)}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <ListItem key={ingredient + index} value={ingredient} />
        ))}
      </ul>
      <img src={image} alt={title} />
    </div>
  );
};

export default Recipe;
