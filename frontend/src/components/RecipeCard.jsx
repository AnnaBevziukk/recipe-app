import React from 'react';
import './RecipeCard.css'; // Стилі додамо окремо

function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} className="card__image" />
      <div className="card__content">
        <h3 className="card__title">{recipe.title}</h3>
        <p className="card__description">{recipe.description}</p>
        <div className="card__meta">
          <span>By {recipe.author}</span>
          <span>{recipe.date}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;