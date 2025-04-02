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
import { useContext, useState } from "react"

const SideBar = () => {
  const loc = usePathname()
  const sidebarContext = useContext(SidebarContext);
  const open = sidebarContext?.open ?? false;
  const [isExpanded, setIsExpanded] = useState(false)

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
    <div
      className={`h-screen rounded-lg p-4 fixed md:sticky top-[132px] z-50 transition-all duration-500 ease-in-out 
       ${open ? "translate-x-0 w-[13rem] left-0" : "w-[6rem] left-[-110%] md:left-0"}  overflow-y-auto scrollbar-hide bg-[#fff] dark:bg-[#0A0A0A]`}
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
                            className={`mb-2 gap-x-4  p-2 flex items-center w-full rounded-[10px] hover:bg-[#b1afaf] dark:hover:bg-[#2e2d2d] cursor-pointer 
                            ${open ? "text-[14px]" : "flex-col justify-center text-[12px]"} 
                            ${loc === `/${child.title}` ? "font-bold" : ""}`}
                          >
                            <span>{child.icon}</span>
                            <div className="capitalize">{child.title}</div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )
              }
              return (
                <Link
                  href={`/${x.title}`}
                  key={index}
                  className={`mb-4 gap-x-4 p-3 flex items-center w-full rounded-[10px] hover:bg-[#b1afaf] dark:hover:bg-[#2e2d2d] cursor-pointer 
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
    </div>
  )
}

export default SideBar

export const SidToggle = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  return (
    <div className="sidebarToggler mr-3">
      <button
        onClick={toggleSidebar}
        className="cursor-pointer p-2 rounded text-black dark:text-white"
        type="button"
        title="Toggle Sidebar"
      >
        <AlignJustify />
      </button>
    </div>
  )
}

