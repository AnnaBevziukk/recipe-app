// import React, { useState } from 'react';
// import RecipeCard from './RecipeCard';
// import recipes from '../data/recipe.json';
// import s from './RecipeList.module.scss'
//
// function RecipeList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const recipesPerPage = 20;
//   const totalPages = Math.ceil(recipes.length / recipesPerPage);
//
//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//
//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };
//
//   const startIndex = (currentPage - 1) * recipesPerPage;
//   const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);
//
//   return (
//     <div className={s.recept}>
//       <div className={s.recept__list}>
//         {currentRecipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>
//
//       <div className={s.recept__pagination}>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//
//     </div>
//   );
// }
//
// export default RecipeList;
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import s from './RecipeList.module.scss';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recipesPerPage = 20;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
          credentials: 'include', // Для авторизації, якщо потрібно
        });
        const data = await res.json();

        if (res.ok) {
          setRecipes(data.data); // Адаптуй до структури відповіді бекенду
          setTotalPages(Math.ceil(data.total / recipesPerPage)); // Адаптуй до поля total
        } else {
          setError('Помилка при завантаженні рецептів');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Не вдалося зʼєднатися із сервером');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={s.recept}>
      {loading && <div className={s.recept__loading}>Завантаження...</div>}
      {error && <div className={s.recept__error}>{error}</div>}
      {!loading && !error && recipes.length === 0 && <div className={s.recept__noData}>Рецептів не знайдено.</div>}
      {!loading && !error && (
        <>
          <div className={s.recept__list}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className={s.recept__pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeList;