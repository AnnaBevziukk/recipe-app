import React from "react";
import s from "./RecipeCard.module.scss";
import recipeImg from "../images/recipeIMG.jpg";

function RecipeCard({ recipe }) {
  return (
    <div className={s.card}>
      <img
        src={recipe.image || recipeImg}
        alt={recipe.title}
        className={s.card__img}
      />
      <div className={s.card__content}>
        <h3 className={s.card__title}>{recipe.title}</h3>
        <p className={s.card__ingredients}>
          {recipe.ingredients || "No ingredients"}
        </p>
        <div className={s.card__meta}>
          <span className={s.card__metaTime}>
            {recipe.preparationTime || "N/A"} m
          </span>
          <span className={s.card__metaAuthor}>
            By {recipe.author || "Unknown"}
          </span>
          <span className={s.card__metaDate}>{recipe.date || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
