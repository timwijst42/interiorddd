'use client'

import { Camera } from "lucide-react"

export function ScreenshotButton() {
    const handleScreenshot = () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            const link = document.createElement('a')
            link.setAttribute('download', 'materialflow-design.png')
            link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
        }
    }

    return (
        <button
            onClick={handleScreenshot}
            className="absolute top-20 right-4 z-40 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform text-gray-700"
            aria-label="Take Screenshot"
        >
            <Camera className="w-5 h-5" />
        </button>
    )
}
