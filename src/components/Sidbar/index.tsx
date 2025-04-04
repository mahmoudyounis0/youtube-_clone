"use client"

import {
  historyIcon,
  homeIcon,
  LikedVidIcon,
  playlistIcon,
  shortsIcon,
  subIcon,
  userIcon,
  watchLaterIcon,
  yourCoursesIcon,
  yourVidIcon,
} from "@/constant/icons"
import { SidebarContext } from "@/Context/SidebarContext"
import { AlignJustify, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { ThemeToggle } from "../theme-toggle"

const SideBar = () => {
  const loc = usePathname()
  const sidebarContext = useContext(SidebarContext)
  const open = sidebarContext?.open ?? false
  const [isExpanded, setIsExpanded] = useState(false)
  const isWatchPage = loc === "/watch" || loc?.startsWith("/watch?")
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, open])

  // Close sidebar when clicking outside on watch page
  useEffect(() => {
    if (isWatchPage) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-sidebar="true"]') && open) {
          sidebarContext?.toggleSidebar()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isWatchPage, open, sidebarContext])

  const sidebaritems = [
    {
      group: "short",
      items: [
        { title: "home", icon: homeIcon },
        { title: "shorts", icon: shortsIcon },
        { title: "subscriptions", icon: subIcon },
      ],
    },
    {
      group: "you",
      items: [{ title: "you", icon: userIcon }],
      other: [
        { title: "history", icon: historyIcon },
        { title: "playlist", icon: playlistIcon },
        { title: "your videos", icon: yourVidIcon },
        { title: "your courses", icon: yourCoursesIcon },
        { title: "watch later", icon: watchLaterIcon },
        { title: "liked videos", icon: LikedVidIcon },
        { title: "history", icon: historyIcon },
        { title: "playlist", icon: playlistIcon },
        { title: "your videos", icon: yourVidIcon },
        { title: "your courses", icon: yourCoursesIcon },
        { title: "watch later", icon: watchLaterIcon },
        { title: "liked videos", icon: LikedVidIcon },
      ],
    },
  ]

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-40"
          onClick={() => sidebarContext?.toggleSidebar()}
          aria-hidden="true"
        />
      )}

      <div
        data-sidebar="true"
        className={`h-screen rounded-lg p-4 transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hide bg-[#fff] dark:bg-[#0A0A0A] z-50
          ${
            isWatchPage
              ? `fixed top-[48px] rounded-0 ${open ? "left-0" : "left-[-100%]"} w-[13rem]`
              : `${open ? "translate-x-0 w-[13rem]" : "w-[6rem] left-[-110%] md:left-0"} fixed md:sticky top-[100px]`
          }`}
      >
        <div className="mt-4 space-y-2">
          {sidebaritems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.items.map((x, index) => {
                if (x.title === "you") {
                  return (
                    <div key={index}>
                      <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`mb-4 gap-x-4 p-3 flex items-center w-full rounded-[10px] hover:bg-[#b1afaf] dark:hover:bg-[#2e2d2d] cursor-pointer 
                        ${open ? "text-[16px]" : "flex-col justify-center text-[12px]"} 
                        ${loc === "/you" ? "font-bold" : ""}`}
                      >
                        <span>{x.icon}</span>
                        <div className="capitalize flex-1 text-left">{x.title}</div>
                        {open ? <span>{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span> : ""}
                      </button>

                      {/* Child Links (Other Items) */}
                      {isExpanded && open ? (
                        <div className="pl-6">
                          {section.other?.map((child, childIndex) => (
                            <Link
                              href={`/${child.title}`}
                              key={childIndex}
                              className={`mb-2 gap-x-4 p-2 flex items-center w-full rounded-[10px] hover:bg-[#b1afaf] dark:hover:bg-[#2e2d2d] cursor-pointer
                              ${open ? "text-[14px]" : "flex-col justify-center text-[12px]"} 
                              ${loc === `/${child.title}` ? "font-bold" : ""}`}
                            >
                              <span>{child.icon}</span>
                              <div className="capitalize">{child.title}</div>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                }
                return (
                  <Link
                    href={`/${x.title === "home" ? "" : x.title}`}
                    key={index}
                    className={`mb-4 gap-x-4 p-3 flex items-center rounded-[10px] hover:bg-[#b1afaf] dark:hover:bg-[#2e2d2d] cursor-pointer 
                    ${open ? "text-[16px]" : "flex-col justify-center text-[12px]"} 
                    ${loc === `/${x.title}` || (loc === "/" && x.title === "home") ? "font-bold" : ""}`}
                  >
                    <span>{x.icon}</span>
                    <div className="capitalize">{x.title}</div>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
        <div className="last text-center md:hidden mt-6">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}

export default SideBar

export const SidToggle = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  const loc = usePathname()
  const isWatchPage = loc === "/watch" || loc?.startsWith("/watch?")

  return (
    <div className="sidebarToggler mr-3">
      <button
        onClick={toggleSidebar}
        className={`cursor-pointer p-2 rounded text-black dark:text-white ${isWatchPage ? "z-[60]" : ""}`}
        type="button"
        title="Toggle Sidebar"
        data-sidebar="true"
      >
        <AlignJustify />
      </button>
    </div>
  )
}

