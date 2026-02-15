'use client'

import { useStore } from "@/store/useStore"
import { RotateCcw, Bookmark, Pause, Play, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

const btnBase = "w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-white/20 transition-all duration-150 active:scale-90"

export function TopBar() {
    const { reset, isRotating, toggleRotation, addSnapshot } = useStore()

    const handleBookmark = () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            const thumbnail = canvas.toDataURL('image/png')
            const name = `Design ${Date.now().toString().slice(-4)}`
            addSnapshot(name, thumbnail)
        }
    }

    const handleScreenshot = () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            const link = document.createElement('a')
            link.setAttribute('download', 'primacy-design.png')
            link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
        }
    }

    return (
        <div className="absolute top-0 left-0 right-0 z-50 pt-safe px-4 pb-2">
            <div className="flex items-center justify-between h-12">
                <h1 className="text-lg font-bold tracking-tight bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    Primacy <span className="text-gray-500 font-normal">Lite</span>
                </h1>

                <div className="flex items-center gap-2">
                    {/* Screenshot */}
                    <button
                        onClick={handleScreenshot}
                        className={cn(btnBase, "text-gray-600")}
                        aria-label="Take Screenshot"
                    >
                        <Camera className="w-4 h-4" />
                    </button>

                    {/* Bookmark / Save */}
                    <button
                        onClick={handleBookmark}
                        className={cn(btnBase, "text-gray-600")}
                        aria-label="Bookmark Design"
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>

                    {/* Stop/Play Rotation */}
                    <button
                        onClick={toggleRotation}
                        className={cn(btnBase, isRotating ? "text-gray-600" : "text-blue-600 bg-blue-50/90")}
                        aria-label={isRotating ? "Pause Rotation" : "Resume Rotation"}
                    >
                        {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Reset */}
                    <button
                        onClick={reset}
                        className={cn(btnBase, "text-gray-600")}
                        aria-label="Reset Scene"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
