const getOgImageUrl = async (title, description, image) => {
  const apiUrl = `https://pearlbox.co/api/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data =  await response.json(); // Parse the response JSON
      return data.url; // Return the actual URL from the response data
    } else {
      console.error('Failed to fetch OG image:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching OG image:", error);
    return null;
  }
};

const getClientOgImageUrl = async (title, description, image) => {
  const apiUrl = `http://localhost:3000/api/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data =  response; // Parse the response JSON
      return data.url; // Return the actual URL from the response data
    } else {
      console.error('Failed to fetch OG image:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching OG image:", error);
    return null;
  }
};

export { getOgImageUrl, getClientOgImageUrl };
