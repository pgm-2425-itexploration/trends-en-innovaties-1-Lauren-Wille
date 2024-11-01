export default defineEventHandler(async (event) => {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    return data;
  });
  