"use client"
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react"
import { youtubeApi } from "@/lib/api/youtube"
import type { YouTubeVideo } from "@/types/youtube"
import TopTrendingTopics from "@/components/TopTrendingTopics"
import VideoCard from "@/components/videocard"
import { useInfiniteScroll } from "@/Context/use-infinite-scroll"
import SidebarContext from "@/Context/SidebarContext"
import { LoadingSpinner } from "@/components/loading-spinner"
export default function Home() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const { isFetching, setIsFetching, hasMore, setHasMore } = useInfiniteScroll()
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = useCallback(async (pageToken = "") => {
    try {
      const response = await youtubeApi.getPopularVideos("EG", 12, pageToken);
  
      if (pageToken) {
        setVideos((prev) => [...prev, ...response.items]);
      } else {
        setVideos(response.items);
      }
  
      setNextPageToken(response.nextPageToken);
      setHasMore(!!response.nextPageToken);
      setError(null);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  }, [setVideos, setNextPageToken, setHasMore, setError, setIsFetching]);
  
  useEffect(() => {
    if (isFetching) {
      fetchVideos(nextPageToken || "");
    }
  }, [isFetching, fetchVideos, nextPageToken]);

  useEffect(() => {
    if (isFetching) {
      fetchVideos(nextPageToken || "")
    }
  }, [isFetching,fetchVideos, nextPageToken])
   const sidebarContext = useContext(SidebarContext);
    const open = sidebarContext?.open ?? false;
  return <>
    <div className="overflow-hidden w-full">
      <div className="dark:bg-[#0A0A0A] z-50 fixed bg-[#fff]"> 
      <TopTrendingTopics />
      </div>
      <div className="px-4 mt-15">
      {error ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      ) : videos.length === 0 && !isFetching ? (
       <LoadingSpinner />
      ) : (
        <>
          <div className={`grid  grid-cols-1 sm:grid-cols-1 gap-4 ${open?'md:grid-cols-2 lg:grid-cols-2':'md:grid-cols-2 lg:grid-cols-3'} `}>
            {videos.map((video: YouTubeVideo) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {isFetching && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          )}

          {!hasMore && videos.length > 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No more videos to load</div>
          )}
        </>
      )}
      </div>
    </div>
  </>
}