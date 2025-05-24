import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import s from "./RecipeList.module.scss";
import recipes from "../data/recipe.json"; // Імпортуємо заглушку
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
function RecipeList() {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recipesPerPage = 6;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  // ВАРІАНТ 1: Використання заглушки (data/recipes.json)
  useEffect(() => {
    // Імітація завантаження
    setLoading(true);
    try {
      // Сортуємо або фільтруємо, якщо потрібно (заглушка)
      const sortedRecipes = [...recipes]; // Копія масиву для уникнення мутації
      setCurrentRecipes(sortedRecipes.slice(0, recipesPerPage)); // Перша сторінка
    } catch (err) {
      setError("Помилка при обробці даних");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Оновлення рецептів при зміні сторінки
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    setCurrentRecipes(recipes.slice(startIndex, endIndex));
  }, [currentPage]);

  // ВАРІАНТ 2: Використання API (закоментований)
  /*
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
          credentials: 'include', // Для авторизації, якщо потрібно
        });
        const data = await res.json();

        if (res.ok) {
          setCurrentRecipes(data.data); // Адаптуй до структури відповіді бекенду
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
  */

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={s.recept}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <>
          <div className={s.recept__list}>
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className={s.recept__pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={s.recept__paginationButton}
            >
              <FaChevronLeft />
            </button>
            <span className={s.recept__paginationInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={s.recept__paginationButton}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeList;
