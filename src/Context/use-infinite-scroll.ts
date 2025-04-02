"use client"

import { useState, useEffect, useCallback } from "react"

interface UseInfiniteScrollOptions {
  threshold?: number
  initialLoad?: boolean
}

export function useInfiniteScroll({ threshold = 200, initialLoad = true }: UseInfiniteScrollOptions = {}) {
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const checkScrollPosition = useCallback(() => {
    if (!hasMore || isFetching) return

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      setIsFetching(true)
    }
  }, [hasMore, isFetching, threshold])

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition)
    return () => window.removeEventListener("scroll", checkScrollPosition)
  }, [checkScrollPosition])

  useEffect(() => {
    if (initialLoad) {
      setIsFetching(true)
    }
  }, [initialLoad])

  return {
    isFetching,
    setIsFetching,
    hasMore,
    setHasMore,
  }
}

