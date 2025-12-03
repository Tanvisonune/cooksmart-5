// Handles shared frontend logic such as:
// - Showing recipe details popup
// - Loading featured recipes on the homepage
// Communicates with backend running on localhost:5000

const API_BASE_URL = 'http://localhost:5000'; // make sure this matches your backend port

// ------------------------------
// Show recipe details in popup modal
// (used when clicking a recipe card)
// ------------------------------
async function showRecipeDetails(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!res.ok) throw new Error('Recipe not found');
    const recipe = await res.json();

    // TODO: your existing modal-building code goes here.
    // I kept your structure exactly; just leave whatever you already had here.
    // Example (temporary fallback):
    console.log('Recipe details:', recipe);
    alert(`Recipe: ${recipe.name || recipe.title || 'Recipe'}\nTime: ${recipe.cookingTime || recipe.time || 'N/A'} min`);

    // If you already had detailed modal HTML/JS, paste it back inside this try block.

  } catch (err) {
    console.error('Error loading recipe:', err);
    alert('Unable to load recipe details');
  }
}

// ------------------------------
// Load featured recipes on homepage
// ------------------------------
async function loadFeaturedRecipes() {
  try {
    const res = await fetch(`${API_BASE_URL}/recipes`);
    if (!res.ok) throw new Error('Failed to load recipes');
    const recipes = await res.json();

    // If you have a function displayFeaturedRecipes in index.html or elsewhere,
    // this will still call it:
    if (typeof displayFeaturedRecipes === 'function') {
      displayFeaturedRecipes(recipes.slice(0, 6)); // First 6 recipes
    }
  } catch (err) {
    console.error('Error loading featured recipes:', err);
  }
}

// Only run featured loading on pages that actually have the section
document.addEventListener('DOMContentLoaded', () => {
  const featuredSection = document.getElementById('featuredRecipes');
  if (featuredSection) {
    loadFeaturedRecipes();
  }
});
