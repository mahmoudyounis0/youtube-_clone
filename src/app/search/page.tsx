import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import SearchPage from "@/components/search-page-client"

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="w-full grid place-content-center">
          <LoadingSpinner />
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  )
}

