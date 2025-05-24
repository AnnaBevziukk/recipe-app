import React, { useState, useEffect } from 'react';
import ModerationRecipeCard from '../components/ModerationRecipeCard';
import s from './ModerationPage.module.scss';
import recipes from '../data/recipemod.json'; // Заглушка для даних
import RecipeCard from '../components/RecipeCard';
function ModerationPage() {
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Фільтруємо рецепти зі статусом "pending" (заглушка)
      const filteredRecipes = recipes.filter((r) => r.status === 'pending');
      setPendingRecipes(filteredRecipes);
    } catch (err) {
      setError('Помилка при обробці даних');
    } finally {
      setLoading(false);
    }
  }, []);

  // Реальний запит до API (закоментований)
  /*
  useEffect(() => {
    const fetchPendingRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/recipes?status=pending', {
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          setPendingRecipes(data.data); // Адаптуй до структури відповіді бекенду
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

    fetchPendingRecipes();
  }, []);
  */

  const handleApprove = (id) => {
    console.log(`Схвалення рецепту ${id}`);
    setPendingRecipes(pendingRecipes.filter((r) => r.id !== id)); // Видаляємо схвалений рецепт зі списку
    // Реальний запит до API (розкоментувати пізніше):
    /*
    fetch(`http://localhost:3000/recipes/${id}/approve`, {
      method: 'PATCH',
      credentials: 'include',
    }).then(() => {
      setPendingRecipes(pendingRecipes.filter((r) => r.id !== id));
    });
    */
  };

  const handleReject = (id) => {
    console.log(`Відхилення рецепту ${id}`);
    setPendingRecipes(pendingRecipes.filter((r) => r.id !== id)); // Видаляємо відхилений рецепт зі списку
    // Реальний запит до API (розкоментувати пізніше):
    /*
    fetch(`http://localhost:3000/recipes/${id}/reject`, {
      method: 'PATCH',
      credentials: 'include',
    }).then(() => {
      setPendingRecipes(pendingRecipes.filter((r) => r.id !== id));
    });
    */
  };

  return (
    <div className={s.moderation}>
      <h2>Сторінка модерації</h2>
      {loading && <div className={s.moderation__loading}>Завантаження...</div>}
      {error && <div className={s.moderation__error}>{error}</div>}
      {!loading && !error && pendingRecipes.length === 0 && (
        <div className={s.moderation__noData}>Немає рецептів для модерації.</div>
      )}
      {!loading && !error && pendingRecipes.length > 0 && (
        <div className={s.moderation__list}>
          {pendingRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isModeration={true}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ModerationPage;