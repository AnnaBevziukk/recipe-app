// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import s from './RecipeCard.module.scss';
// import recipeImg from '../images/recipeIMG.jpg';
//
// function RecipeCard({ recipe }) {
//   const navigate = useNavigate();
//
//   const handleClick = () => {
//     navigate(`/recipes/${recipe.id}`);
//   };
//
//   return (
//     <div className={s.card} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}>
//       {/*<img src={recipe.image || recipeImg} alt={recipe.title} className={s.card__img} />*/}
//
//       {/*TODO*/}
//
//       <img src={recipeImg} alt={recipe.title} className={s.card__img} />
//       <div className={s.card__content}>
//         <h3 className={s.card__title}>{recipe.title}</h3>
//         <p className={s.card__ingredients}>{recipe.ingredients || 'No ingredients'}</p>
//         <div className={s.card__meta}>
//           <span className={s.card__metaTime}>{recipe.time || 'N/A'} m</span>
//           <span className={s.card__metaAuthor}>By {recipe.author || 'Unknown'}</span>
//           <span className={s.card__metaDate}>{recipe.date || 'N/A'}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default RecipeCard;

// components/RecipeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./RecipeCard.module.scss";
import recipeImg from "../images/recipeIMG.jpg";
import { FaClock } from "react-icons/fa";

function RecipeCard({ recipe, isModeration = false, onApprove, onReject }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isModeration) {
      navigate(`/recipes/${recipe.id}`);
    }
  };

  return (
    <div>
      <div
        className={s.card}
        onClick={!isModeration ? handleClick : null}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!isModeration && e.key === "Enter") handleClick();
        }}
      >
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
            <span className={s.card__time}>
              <FaClock className={s.card__icon} /> {recipe.time || "N/A"} m
            </span>
            <span className={s.card__author}>
              By {recipe.author || "Unknown"}
            </span>
            <span className={s.card__date}>{recipe.date || "N/A"}</span>
          </div>
        </div>
      </div>

      {isModeration && (
        <div className={s.card__actions}>
          <div className={s.card__description}>
            <h4>Опис</h4>
            <p>{recipe.description}</p>
          </div>
          <div className={s.card__buttons}>
            <button
              className={s.card__approveBtn}
              onClick={(e) => {
                e.stopPropagation();
                onApprove(recipe.id);
              }}
            >
              Approve
            </button>
            <button
              className={s.card__rejectBtn}
              onClick={(e) => {
                e.stopPropagation();
                onReject(recipe.id);
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
