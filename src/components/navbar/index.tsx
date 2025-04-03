"use client"
import { ThemeToggle } from "../theme-toggle"
import logo from "@/app/assets/logo.svg"
import Image from "next/image"
import { SidToggle } from "../Sidbar"
import { searchIcon, searchIconsmall } from "@/constant/icons"
import { useEffect, useState } from "react"
import { youtubeApi } from "@/lib/api/youtube"
import Link from "next/link"

const Nav = () => {
  const [searchResultAutoComplete, setSearchResultAutoComplete] = useState([])
  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const showBox = () => {
    setShow(true)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const results = await youtubeApi.getSearchAutocomplete(searchQuery)
        setSearchResultAutoComplete(results)
      } else {
        setSearchResultAutoComplete([])
      }
    }

    fetchSearchResults()
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent ) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#search") &&
        !target.closest(".searchIcon") &&
        !target.closest(".searchResultsContainer")
      ) {
        setShow(false)
      }
    }
    if (show) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [show])

  return (
    <div className="flex items-center justify-between px-2 py-2 bg-[#fff] dark:bg-[#0A0A0A] z-60 sticky top-0 ">
      <div className="head flex items-center ">
        <SidToggle />
        <Link href={'/'} className="logo h-8 w-8 flex items-center">
          <Image src={logo || "/placeholder.svg"} alt="Logo" className="w-full h-full" width={100} height={100} />
          <span className="tracking-tighter text-[20px]">YouTube</span>
        </Link>
      </div>
      <div className="search flex items-center relative">
        <input
          id="search"
          className="px-3 w-0 sm:w-0 md:w-[15rem] lg:w-[30rem] rounded-l-3xl border dark:bg-[#0A0A0A] py-2 focus:outline-[#3548f8]"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => showBox()}
        />
        <label htmlFor="search" className="searchIcon cursor-pointer rounded-r-3xl border dark:bg-[#2e2d2d] px-3 py-2">
          <span>{searchIcon}</span>
        </label>
        <div
          className={`searchResultsContainer z-50 absolute top-[110%] left-0 w-[90%] max-h-[50vh] shadow-2xl bg-white rounded-2xl dark:bg-[#2e2d2d] ${show ? "" : "hidden"} overflow-y-auto scrollbar-hide`}
        >
          {searchResultAutoComplete?.length > 0 ? (
            searchResultAutoComplete.map((result, index) => (
              <div key={index} className="searchResult my-2 p-2">
                <div className="flex gap-x-3 items-center mb-2">
                  <span>{searchIconsmall}</span>
                  <p className="tracking-wide">{result}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="my-2 p-2" dir="rtl">10 حقائق تثبت ان ميسي من الشرقيه </div>
          )}
        </div>
      </div>
      <div className="last">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Nav

