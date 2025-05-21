// components/ModerationRecipeCard.jsx
import React from 'react';
import s from './RecipeCard.module.scss'; // Використовуємо існуючі стилі

function ModerationRecipeCard({ recipe, onApprove, onReject }) {
  return (
    <div className={s.card}>
      <img src={recipe.image} alt={recipe.title} className={s.card__img} />
      <div className={s.card__content}>
        <h3 className={s.card__title}>{recipe.title}</h3>
        <p className={s.card__ingredients}>{recipe.ingredients || 'No ingredients'}</p>
        <div className={s.card__meta}>
          <span className={s.card__metaTime}>{recipe.time || 'N/A'} m</span>
          <span className={s.card__metaAuthor}>By {recipe.author || 'Unknown'}</span>
          <span className={s.card__metaDate}>{recipe.date || 'N/A'}</span>
        </div>
        <div className={s.card__description}>
          <h4>Опис</h4>
          <p>{recipe.description}</p>
        </div>
        <div className={s.card__actions}>
          <button
            className={s.card__approveBtn}
            onClick={() => onApprove(recipe.id)}
          >
            Схвалити
          </button>
          <button
            className={s.card__rejectBtn}
            onClick={() => onReject(recipe.id)}
          >
            Відхилити
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModerationRecipeCard;