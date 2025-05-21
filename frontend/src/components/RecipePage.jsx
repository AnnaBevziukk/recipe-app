import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './RecipePage.module.scss';
import recipes from '../data/recipe.json'; // Імпортуємо заглушку
import recipeImg from '../images/recipeIMG.jpg';
import {FaStar} from 'react-icons/fa';

function RecipePage() {
  const { id } = useParams(); // Отримуємо ID із URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(''); // Для нового коментаря
  const [comments, setComments] = useState([]); // Список коментарів
  const [rating, setRating] = useState(0); // Оцінка (1-5)
  // ВАРІАНТ 1: Використання заглушки (data/recipes.json)
  useEffect(() => {
    setLoading(true);
    try {
      const foundRecipe = recipes.find((r) => r.id === parseInt(id));
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError('Рецепт не знайдено');
      }
    } catch (err) {
      setError('Помилка при обробці даних');
    } finally {
      setLoading(false);
    }
  }, [id]);


  // ВАРІАНТ 2: Використання API (закоментований)
  /*
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/recipes/${id}`, {
          credentials: 'include', // Для авторизації, якщо потрібно
        });
        const data = await res.json();

        if (res.ok) {
          setRecipe(data.data); // Адаптуй до структури відповіді бекенду
        } else {
          setError('Рецепт не знайдено');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Не вдалося зʼєднатися із сервером');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  */


  // Надсилання нового коментаря на бекенд
  // const handleAddComment = async (e) => {
  //   e.preventDefault();
  //   if (!comment.trim()) return;
  //
  //   try {
  //     const res = await fetch(`http://localhost:3000/recipes/${id}/comments`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify({ text: comment }),
  //     });
  //
  //     if (!res.ok) throw new Error('Не вдалося додати коментар');
  //
  //     const newComment = await res.json();
  //     setComments([...comments, newComment.data]); // Припускаємо, що бекенд повертає новий коментар у полі data
  //     setComment('');
  //   } catch (err) {
  //     console.error('Comment error:', err);
  //     setError('Не вдалося додати коментар');
  //   }
  // };
  //
  // // Надсилання оцінки на бекенд
  // const handleRating = async (value) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/recipes/${id}/rating`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify({ rating: value }),
  //     });
  //
  //     if (!res.ok) throw new Error('Не вдалося зберегти оцінку');
  //
  //     setRating(value);
  //   } catch (err) {
  //     console.error('Rating error:', err);
  //     setError('Не вдалося зберегти оцінку');
  //   }
  // };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { id: Date.now(), text: comment, date: new Date().toLocaleDateString() }]);
      setComment(''); // Очищаємо поле після відправки
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  if (loading) return <div className={s.recipePage__loading}>Завантаження...</div>;
  if (error) return <div className={s.recipePage__error}>{error}</div>;
  if (!recipe) return <div className={s.recipePage__notFound}>Рецепт не знайдено</div>;

  return (
    <div className={s.recipePage}>
      <div className={s.recipePage__header}>
        <img src={recipe.image || recipeImg} alt={recipe.title} className={s.recipePage__image} />
        <div className={s.recipePage__info}>
          <h1 className={s.recipePage__title}>{recipe.title}</h1>
          <h2>Інгредієнти</h2>
          <p className={s.recipePage__ingredients}>{recipe.ingredients}</p>
          <div className={s.recipePage__meta}>
            <span className={s.recipePage__metaTime}>{recipe.time} m</span>
            <span className={s.recipePage__metaAuthor}>By {recipe.author}</span>
            <span className={s.recipePage__metaDate}>{recipe.date}</span>
          </div>
        </div>
      </div>
      <div className={s.recipePage__rating}>
        <h3>Оцінка рецепту</h3>
        <div className={s.recipePage__stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={s.recipePage__star}
              color={star <= rating ? '#FF7F50' : '#ccc'}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        {rating > 0 && <p>Ваша оцінка: {rating} зірочок</p>}
      </div>
      <h2>Інгредієнти</h2>
      <p className={s.recipePage__ingredients}>{recipe.ingredients}</p>
      <h2>Опис</h2>
      <p className={s.recipePage__description}>{recipe.description}</p>
      <div className={s.recipePage__comments}>
        <h2>Коментарі</h2>
        <form onSubmit={handleAddComment} className={s.recipePage__commentForm}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Напишіть ваш коментар..."
            required
          />
          <button type="submit" className={s.recipePage__commentBtn}>
            Додати коментар
          </button>
        </form>
        <div className={s.recipePage__commentList}>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className={s.recipePage__comment}>
                <p>{c.text}</p>
                <span className={s.recipePage__commentDate}>{c.date}</span>
              </div>
            ))
          ) : (
            <p>Ще немає коментарів</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePage;