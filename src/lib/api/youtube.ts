import { YouTubeApiError } from "@/types/youtube";
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
        "x-rapidapi-key": "4c1b1f861fmshb9b0a195c27e81dp1291e2jsn7ed55613ee8e",
        //"73a732509bmsh841f7212caa89cbp1049b9jsn77461d9fb56d",
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
          part: "snippet,statistics",
          chart: "mostPopular",
          regionCode,
          maxResults,
          pageToken: pageToken || undefined,
          key: "AIzaSyArMRajwoca9EL-oeuUuYGgDMuH-svo3UI",
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
          key: 'AIzaSyArMRajwoca9EL-oeuUuYGgDMuH-svo3UI',
        },
      })

      return response.data.items?.[0] || null
    } catch (error) {
      console.error("Error fetching video details:", error)
      return null
    }
  },
  searchVideos: async (query: string, pageToken = "", maxResults = 12) => {
    if (!query) return { items: [], nextPageToken: null }

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults,
          pageToken: pageToken || undefined,
          key: "AIzaSyArMRajwoca9EL-oeuUuYGgDMuH-svo3UI",
        },
      })
      const items = response.data.items.map((item: { kind: string, etag: string, id: { videoId: string }, snippet: { title: string, description: string, thumbnails: { default: { url: string } } } }) => ({
        kind: item.kind,
        etag: item.etag,
        id: item.id.videoId,
        snippet: item.snippet,
        statistics: {}, // Search API doesn't return statistics
      }))

      return {
        items,
        nextPageToken: response.data.nextPageToken || null,
        pageInfo: response.data.pageInfo || null,
      }
    } catch (error: unknown) {
      const apiError = error as YouTubeApiError
      console.error("Error searching videos:", error)
      if (apiError.response?.data?.error?.message) {
        console.error("API Error:", apiError.response.data.error.message)
      }
      return { items: [], nextPageToken: null, pageInfo: null }
    }
  },
}

