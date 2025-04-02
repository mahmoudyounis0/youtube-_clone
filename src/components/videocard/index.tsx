import { formatDistanceToNow } from "date-fns"
import type { YouTubeVideo } from "@/types/youtube"
import Link from "next/link"
import profileImg from "@/app/assets/profile.jpg"
import Image from "next/image";

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  // Get the best available thumbnail
  const thumb = 
    video.snippet.thumbnails.maxres || 
    video.snippet.thumbnails.standard || 
    video.snippet.thumbnails.high || 
    video.snippet.thumbnails.medium || 
    video.snippet.thumbnails.default;
  
  const publishedDate = new Date(video.snippet.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  
  return (
    <Link href={`/watch?v=${video.id}`} className="block ">
      <div className='vidcard cursor-pointer'>
        <div className='p-2 item w-full vidImg'>
       <Image   src={thumb.url || "/placeholder.svg"} 
            alt={video.snippet.title} 
            className="rounded-xl w-full aspect-video object-cover" 
            loading="lazy"   width={400} height={400}/>
          {/* <div className="vidtime absolute bottom-3 right-3">
            <p className="bg-[#141414e5] text-white text-center text-[12px] w-fit px-1.5 rounded-[3px]">
              {duration}
            </p>
          </div> */}
        </div>
        <div className="vidDetails">
          <div className="flex">
            <div className="vidImgProfile w-12 h-12 me-2 flex-shrink-0">
              <Image src={profileImg || "/placeholder.svg"} alt={video.snippet.channelTitle} className="rounded-full w-full h-full object-cover" width={500} height={500} />
            </div>
            <div className="vidDeatilContent justify-self-start">
              <h4 className="vidtilte font-medium line-clamp-2">{video.snippet.title}</h4>
              <p className="channleName text-[#837f7f]">{video.snippet.channelTitle}</p>
                <p className="text-[#837f7f] text-[12px]">{timeAgo}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
