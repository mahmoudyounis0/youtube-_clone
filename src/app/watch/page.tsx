import { Suspense } from "react"
import WatchPageClient from "@/components/watch-page-client"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full grid place-content-center">
          <LoadingSpinner />
        </div>
      }
    >
      <WatchPageClient />
    </Suspense>
  )
}

