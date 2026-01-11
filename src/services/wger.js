import axios from 'axios';

const BASE_URL = '/api/v2'; 

export const fetchExercises = async () => {
  try {
    // 1. We switch back to 'exerciseinfo' to get the full details (names, descriptions)
    const response = await axios.get(`${BASE_URL}/exerciseinfo/?language=2&limit=50`);
    
    if (response.data.results && response.data.results.length > 0) {
      console.log("API Success:", response.data.results);
      return response.data.results;
    } else {
      throw new Error("API returned empty list");
    }
  } catch (error) {
    console.warn("API Request Failed. Switching to Fallback List.", error);
    return [
      { id: 1, name: 'Bench Press (Fallback)' },
      { id: 2, name: 'Squat (Fallback)' },
      { id: 3, name: 'Deadlift (Fallback)' }
    ];
  }
};