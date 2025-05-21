import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewRecipePage.module.scss';

function AddRecipePage({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const author = user?.name || 'Unknown';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Adding recipe:', { title, description, ingredients, time, author, image });

    // Тут буде API-запит для додавання рецепту, коли бекенд буде готовий
    /*
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('time', time);
    formData.append('author', author);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to add recipe');
      alert('Recipe added successfully!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    */
  };

  return (
    <div className={styles.container}>
      <h2>Додати новий рецепт</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Назва</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ingredients">Інгредієнти</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="time">Час приготування (хвилини)</label>
          <input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Автор</label>
          <input
            id="author"
            type="text"
            value={author}
            readOnly // Поле лише для читання
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Зображення</label>
          <div className={styles.fileUploadWrapper}>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <label htmlFor="image" className={styles.fileLabel}>
              {image ? 'Зображення вибрано' : 'Обрати зображення'}
            </label>
          </div>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Додати рецепт
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;