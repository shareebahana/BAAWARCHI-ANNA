import axios from 'axios';

const API_BASE_URL = 'https://api.edamam.com/search';
const APP_ID = '6fa41abb';  // Replace with your Edamam App ID
const APP_KEY = '2e30c13f677ab8531d9f3b4fbc8a59dc';  // Replace with your Edamam API Key

export const fetchIndianRecipes = async (ingredients) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        q: ingredients,  // Query for ingredients
        app_id: APP_ID,
        app_key: APP_KEY,
        cuisineType: 'Indian',
        from: 0,
        to: 1,  // Number of recipes to fetch
      },
    });
    return response.data.hits.map(hit => hit.recipe);
  } catch (error) {
    console.error('Error fetching Indian recipes:', error);
    throw error;
  }
};
