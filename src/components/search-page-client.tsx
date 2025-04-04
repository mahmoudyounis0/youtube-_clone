"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { youtubeApi } from "@/lib/api/youtube"
import type { YouTubeVideo } from "@/types/youtube"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useContext } from "react"
import { SidebarContext } from "@/Context/SidebarContext"
import { useInfiniteScroll } from "@/Context/use-infinite-scroll"
import VideoCard from "@/components/videocard"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const { isFetching, setIsFetching, hasMore, setHasMore } = useInfiniteScroll()
  const [error, setError] = useState<string | null>(null)
  const { open } = useContext(SidebarContext)

  // Reset search results when query changes
  useEffect(() => {
    setVideos([])
    setNextPageToken(null)
    setHasMore(true)
    setIsFetching(true)
  }, [query, setIsFetching, setHasMore])

  const fetchSearchResults = async (pageToken = "") => {
    if (!query) {
      setIsFetching(false)
      return
    }

    try {
      const response = await youtubeApi.searchVideos(query, pageToken)
      console.log(response);

      if (pageToken) {
        setVideos((prev) => [...prev, ...response.items])
      } else {
        setVideos(response.items)
      }

      setNextPageToken(response.nextPageToken)
      setHasMore(!!response.nextPageToken)
      setError(null)
    } catch (err) {
      console.error("Error searching videos:", err)
      setError("Failed to load search results. Please try again later.")
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    if (isFetching) {
      const fetchResults = async () => {
        await fetchSearchResults(nextPageToken || "");
      };
      fetchResults();
    }
  }, [isFetching, query, nextPageToken]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 px-2">
        {query ? (
          <>
            Search results for <span className="text-blue-600">{query}</span>
          </>
        ) : (
          "Search YouTube"
        )}
      </h1>


      {error ? (
        <div className="p-4">
          <p className="text-red-800">{error}</p>
        </div>
      ) : !query ? (
        <div className="p-4 text-center tracking-wide ">
          <p className="text-blue-800 dark:text-blue-200">Enter a search word to find videos</p>
        </div>
      ) : videos.length === 0 && !isFetching ? (
        <div className="p-4 text-center tracking-wide">
          <p >
            No videos found for <span className="text-blue-600">{query}</span>. Try a different search word.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-1 gap-4 ${open ? "md:grid-cols-2 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {videos.map((video: YouTubeVideo) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {isFetching && (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          )}

          {!hasMore && videos.length > 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No more videos to load</div>
          )}
        </>
      )}
    </div>
  )
}

