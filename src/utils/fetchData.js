export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1b7f8e89e9msh061b02a46b1bdfap15f19fjsn4d5e980a1579',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1b7f8e89e9msh061b02a46b1bdfap15f19fjsn4d5e980a1579',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
}

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
} 