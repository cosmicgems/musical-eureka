


const getOgImageUrl = async (title, description, image) => {
    
    const encodeImageUrl = (imageUrl) => {
        return imageUrl.replace(/\./g, '%2E');
    };
    const encodedImageUrl = encodeImageUrl(image);

    const apiUrl = `https://pearlbox.co/api/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(encodedImageUrl)}`;
    
    
  
    try {
      const response = await fetch(apiUrl);
      console.log("Response:", response);
  
      if (response.ok) {
        const data = await response;
        console.log("Data:", data);
        return apiUrl;
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
  