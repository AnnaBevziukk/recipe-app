import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { recipes } from '../data/recipes'; // Фейкові дані

function RecipeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <div>
      <div className="recipe-list">
        {currentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default RecipeList;