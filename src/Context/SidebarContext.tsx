'use client'
import { createContext, useState } from "react";

export const SidebarContext = createContext({ open: false, toggleSidebar: () => {} })
import { ReactNode } from "react";

export function Sidebarprovider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)

    const toggleSidebar = () => {
        setTimeout(() => {
            setOpen(!open)
        }, 100);
        console.log("Sidebar toggled");
        
    }

    return (
        <SidebarContext.Provider value={{ open, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}
export default SidebarContext