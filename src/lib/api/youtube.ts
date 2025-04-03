import axios from "axios";


export const youtubeApi = {
  getSearchAutocomplete: async (query: string) => {
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/auto-complete/",
      params: {
        q: query,
        hl: "en",
        gl: "US",
      },
      headers: {
        "x-rapidapi-key": "4335a953bemsha5e7abefdf62bc2p1f8230jsnc5fff2b3033c",
        "x-rapidapi-host": "youtube138.p.rapidapi.com",
      },
    }

    try {
      const response = await axios.request(options)
      return response.data.results
    } catch (error) {
      console.error("Error fetching search results:", error)
      return []
    }
  },

  getPopularVideos: async (
    regionCode: string = "US",
    maxResults: number = 12,
    pageToken: string = ""
  ) => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          regionCode,
          maxResults,
          pageToken: pageToken || undefined,
          key: "AIzaSyBhAd6q0emR_8H-dnNDQQkttAgObOt0zfg",
        },
      });
  console.log(response.data);
  
      return {
        items: response.data.items || [],
        nextPageToken: response.data.nextPageToken || null,
        pageInfo: response.data.pageInfo || null,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching popular videos:", error.message);
  
        if (error.response?.data?.error?.message) {
          console.error("API Error:", error.response.data.error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
  
      return { items: [], nextPageToken: null, pageInfo: null };
    }
  },

  // Function to get video details including statistics
  getVideoDetails: async (videoId: string) => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet,statistics",
          id: videoId,
          key: 'AIzaSyBhAd6q0emR_8H-dnNDQQkttAgObOt0zfg',
        },
      })
      console.log(response.data);
      
      return response.data.items?.[0] || null
    } catch (error) {
      console.error("Error fetching video details:", error)
      return null
    }
  },
}

