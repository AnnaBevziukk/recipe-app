import React from 'react';
import RecipeList from '../components/RecipeList';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <RecipeList />
    </div>
  );
}

export default HomePage;