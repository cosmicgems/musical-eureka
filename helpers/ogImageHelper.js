const getOgImageUrl = async (title, description, image) => {
  const apiUrl = `https://pearlbox.co/api/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`;

  try {
    const response = await fetch(apiUrl);
    console.log("Response:", response);

    if (response.ok) {
      const data =  response; // Parse the response JSON
      console.log("Data:", data);
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

export { getOgImageUrl };
