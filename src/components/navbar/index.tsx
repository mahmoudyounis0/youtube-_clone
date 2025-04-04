"use client"
import { ThemeToggle } from "../theme-toggle"
import type React from "react"

import logo from "@/app/assets/logo.svg"
import Image from "next/image"
import { SidToggle } from "../Sidbar"
import { searchIcon, searchIconsmall } from "@/constant/icons"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { youtubeApi } from "@/lib/api/youtube"

const Nav = () => {
  const router = useRouter()
  const [searchResultAutoComplete, setSearchResultAutoComplete] = useState([])
  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  // Add a new state to track if search is expanded
  const [searchExpanded, setSearchExpanded] = useState(false)

  const showBox = () => {
    setShow(true)
  }

  const searchVid = () => {
    if (searchQuery !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShow(false)
    } else {
      return
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevent page reload
    searchVid()
  }

  const handleSuggestionClick = (suggestion: string) => {
    // Set the search query and immediately perform the search
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setShow(false)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const results = await youtubeApi.getSearchAutocomplete(searchQuery)
        setSearchResultAutoComplete(results)
        document.querySelector(".goBtn")?.classList.remove("hidden")
      } else {
        setSearchResultAutoComplete([])
        document.querySelector(".goBtn")?.classList.add("hidden")
      }
    }
    fetchSearchResults()
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#search") && !target.closest(".searchIcon") && !target.closest(".searchResultsContainer")) {
        setShow(false)
      }
    }
    if (show) {
      document.addEventListener("click", handleClickOutside)
    } else {
      document.removeEventListener("click", handleClickOutside)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [show])

  // Add a function to expand the search input
  const expandSearch = () => {
    setSearchExpanded(true)
    // Focus the input after a small delay to ensure the DOM has updated
    setTimeout(() => {
      document.getElementById("search")?.focus()
    }, 10)
  }

  // Add a function to collapse the search input
  const collapseSearch = () => {
    setSearchExpanded(false)
    setShow(false)
  }

  // Update the return statement to include responsive search behavior
  return (
    <div className="flex items-center justify-between px-2 py-2 bg-[#fff] dark:bg-[#0A0A0A] z-60 sticky top-0">
      <div className={`head flex items-center ${searchExpanded ? "hidden md:flex" : "flex"}`}>
        <SidToggle />
        <Link href={"/"} className="logo h-8 w-8 flex items-center">
          <Image src={logo || "/placeholder.svg"} alt="Logo" className="w-full h-full" width={100} height={100} />
          <span className="tracking-tighter text-[20px]">YouTube</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={`${searchExpanded ? "flex-1 mx-2" : "md:flex-initial"}`}>
        <div className="search flex items-center relative w-full">
          {searchExpanded && (
            <button type="button" onClick={collapseSearch} className="md:hidden mr-2 p-2" aria-label="Back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <input
            id="search"
            className={`px-3 py-2 border dark:bg-[#0A0A0A] focus:outline-[#3548f8] rounded-l-3xl ${
              searchExpanded ? "w-full" : "w-0 md:w-[15rem] lg:w-[30rem] hidden md:block"
            }`}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => showBox()}
          />
          {!searchExpanded && (
            <button type="button" className="md:hidden p-2 rounded-full" onClick={expandSearch} aria-label="Search">
              {searchIcon}
            </button>
          )}
          <button
            type="button"
            className={`goBtn font-bold tracking-wide text-[#3548f8] absolute right-15 cursor-pointer hover:text-[#7380f7] hidden ${
              searchExpanded ? "md:right-12" : ""
            }`}
            onClick={() => searchVid()}
          >
            GO
          </button>
          <button
            type="submit"
            className={`searchIcon cursor-pointer rounded-r-3xl border dark:bg-[#2e2d2d] px-3 py-2 ${
              searchExpanded ? "block" : "hidden md:block"
            }`}
          >
            <span>{searchIcon}</span>
          </button>
          <div
            className={`searchResultsContainer z-50 absolute top-[110%] left-0 w-[90%] max-h-[50vh] shadow-2xl bg-white rounded-2xl dark:bg-[#2e2d2d] ${show ? "" : "hidden"} overflow-y-auto scrollbar-hide`}
          >
            {searchResultAutoComplete?.length > 0 ? (
              searchResultAutoComplete.map((result, index) => (
                <div key={index} className="searchResult my-2 p-2 ">
                  <div
                    className="flex gap-x-3 p-2 items-center hover:bg-[#F0F0F0] dark:hover:bg-[#3F3F3F] cursor-pointer"
                    onClick={() => handleSuggestionClick(result)}
                  >
                    <span>{searchIconsmall}</span>
                    <p className="tracking-wide">{result}</p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="my-2 p-2 hover:bg-[#F0F0F0] dark:hover:bg-[#3F3F3F] cursor-pointer"
                onClick={() => handleSuggestionClick("10 حقائق تثبت ان ميسي من الشرقيه")}
                dir="rtl"
              >
                10 حقائق تثبت ان ميسي من الشرقيه{" "}
              </div>
            )}
          </div>
        </div>
      </form>
      <div className={`last hidden md:block ${searchExpanded ? "hidden md:block" : "block"}`}>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Nav

