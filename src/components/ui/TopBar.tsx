import { useStore } from "@/store/useStore"
import { RotateCcw } from "lucide-react"

export function TopBar() {
    const { reset } = useStore()

    return (
        <div className="absolute top-0 left-0 right-0 z-50 pt-safe px-4 pb-2">
            <div className="flex items-center justify-between h-12">
                <h1 className="text-lg font-bold tracking-tight bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    MaterialFlow <span className="text-gray-500 font-normal">Lite</span>
                </h1>

                <button
                    onClick={reset}
                    className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-white/20 active:scale-95 transition-transform text-gray-700"
                    aria-label="Reset Scene"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
