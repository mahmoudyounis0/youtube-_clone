// Define types for YouTube API responses
export interface YouTubeThumbnail {
    url: string
    width: number
    height: number
  }
  
  export interface YouTubeVideoSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: YouTubeThumbnail
      medium: YouTubeThumbnail
      high: YouTubeThumbnail
      standard?: YouTubeThumbnail
      maxres?: YouTubeThumbnail
    }
    channelTitle: string
    tags?: string[]
    categoryId: string
    liveBroadcastContent: string
    localized: {
      title: string
      description: string
    }
    defaultAudioLanguage?: string
  }
  
  export interface YouTubeVideo {
    kind: string
    etag: string
    id: string
    snippet: YouTubeVideoSnippet
    statistics?: {
      viewCount: string
      likeCount: string
      favoriteCount: string
      commentCount: string
    }
  }
  
  export interface YouTubeVideoListResponse {
    kind: string
    etag: string
    items: YouTubeVideo[]
    nextPageToken?: string
    prevPageToken?: string
    pageInfo?: {
      totalResults: number
      resultsPerPage: number
    }
  }
  
  