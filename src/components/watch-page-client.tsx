"use client"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatDistanceToNow } from "date-fns"
import { youtubeApi } from "@/lib/api/youtube"
import type { YouTubeVideo } from "@/types/youtube"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import profileImg from "@/app/assets/profile.jpg"
import Image from "next/image"
import { formatViewCount } from "../../utils/format-numbers"

export default function WatchPageClient() {
  const params = useSearchParams()
  const vidId = params.get("v")
  const [video, setVideo] = useState<YouTubeVideo | null>(null)
  const [loading, setloading] = useState(false)
const viewCount = formatViewCount(video?.statistics?.viewCount)
  useEffect(() => {
    const getVidDetails = async () => {
      setloading(true)
      if (!vidId) return
      const data = await youtubeApi.getVideoDetails(vidId)
      setVideo(data)
      setloading(false)
    }
    getVidDetails()
    // Remove this console.log or add video to dependencies
    // console.log(video);
  }, [vidId]) // Don't add video here if you remove the console.log

  if (!vidId) {
    return (
      <div>
        <p className="font-bold tracking-wider">No video ID</p>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="w-full grid place-content-center">
        <LoadingSpinner />
      </div>
    )
  }
  let timeAgo = ""
  try {
    if (video?.snippet.publishedAt) {
      const publishedDate = new Date(video.snippet.publishedAt)
      // Check if date is valid before formatting
      if (!isNaN(publishedDate.getTime())) {
        timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })
      }
    }
  } catch (error) {
    console.error("Error formatting date:", error)
    timeAgo = ""
  }
  return (
    <>
      <div className="w-full py-5">
        <div className="w-full h-[75dvh]">
          <iframe
            width="100%"
            height="100%"
            allowFullScreen={true}
            src={`https://www.youtube.com/embed/${video?.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>

      <div className="mt-10 ms-5">
        <h1 className="text-xl font-bold">{video?.snippet.title}</h1>
        <div className="vidDetails mt-5">
          <div className="flex items-center">
            <div className="vidImgProfile w-12 h-12 me-2 flex-shrink-0">
              <Image
                src={profileImg || "/placeholder.svg"}
                alt={video?.snippet.channelTitle || "Channel profile image"}
                className="rounded-full w-full h-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="vidDeatilContent justify-self-start">
              <h4 className="vidtilte font-medium line-clamp-2">{video?.snippet.channelTitle}</h4>
              <p className="text-[#837f7f] text-[12px]">{timeAgo}</p>
            </div>
            <button
              type="button"
              className="ms-3 font-semibold px-4 rounded-full h-fit py-1  border border-[#0A0A0A] hover:bg-black hover:text-[#fff] dark:border-[#fff] dark:hover:text-[#000] hover:dark:bg-[#fff] transition-all duration-300 ease-in-out cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-sm text-[#837f7f]">{timeAgo}</p>
          {video?.statistics && (
            <>
              <span className="mx-2">•</span>
              <p className="text-sm text-[#837f7f]">
              <span>{viewCount}</span>
              </p>
            </>
          )}
        </div>

        <div className="mt-4 p- rounded-lg">
          <p className="text-sm whitespace-pre-line">{video?.snippet.description}</p>
        </div>
      </div>
    </>
  )
}

