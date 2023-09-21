


export async function fetchBlogs() {
    try {
      const response = await fetch(`${DOMAIN}/api/blog/post/get-all-home?page=1&limit=5`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  }
  
  export async function fetchVideos() {
    try {
      const response = await fetch(`${DOMAIN}/api/youtube_playlist`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      return data.videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }