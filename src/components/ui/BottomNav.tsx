import { useStore } from "@/store/useStore"
import { Layers, Palette, Armchair } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const { activePanel, setActivePanel } = useStore()

    const navItems = [
        { id: 'materials', icon: Layers, label: 'Materials' },
        { id: 'colors', icon: Palette, label: 'Colors' },
        { id: 'objects', icon: Armchair, label: 'Objects' },
    ] as const

    return (
        <div className="absolute bottom-6 left-4 right-4 z-50">
            <div className="h-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 flex items-center justify-evenly border border-white/20">
                {navItems.map((item) => {
                    const isActive = activePanel === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActivePanel(isActive ? null : item.id)}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full transition-all duration-300",
                                isActive ? "text-black scale-105" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6 transition-transform", isActive && "-translate-y-0.5")} />
                            <span className={cn("text-[10px] font-medium mt-1 opacity-0 transition-opacity", isActive && "opacity-100")}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
