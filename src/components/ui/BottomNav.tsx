'use client'

import { useStore } from "@/store/useStore"
import { Layers, Palette, Armchair, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const { activePanel, setActivePanel } = useStore()

    const navItems = [
        { id: 'materials', icon: Layers, label: 'Materials' },
        { id: 'objects', icon: Armchair, label: 'Objects' },
        { id: 'colors', icon: Palette, label: 'Colors' },
        { id: 'compare', icon: ArrowLeftRight, label: 'Compare' },
    ] as const

    return (
        <div className="absolute bottom-4 left-4 right-4 z-50">
            <div className="h-14 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 flex items-center justify-evenly border border-white/20">
                {navItems.map((item) => {
                    const isActive = activePanel === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActivePanel(isActive ? null : item.id)}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full transition-all duration-150 active:scale-90",
                                isActive ? "text-black" : "text-gray-400"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform duration-200", isActive && "-translate-y-0.5")} />
                            <span className={cn("text-[9px] font-medium mt-0.5 transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0")}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
