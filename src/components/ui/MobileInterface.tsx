'use client'

import { useStore } from "@/store/useStore"
import { TopBar } from "./TopBar"
import { BottomNav } from "./BottomNav"
import { MaterialPanel } from "./MaterialPanel"
import { ColorPanel } from "./ColorPanel"
import { ObjectPanel } from "./ObjectPanel"
import { ScreenshotButton } from "./ScreenshotButton"
import { AnimatePresence } from "framer-motion"

export function MobileInterface({ children }: { children: React.ReactNode }) {
    const { activePanel } = useStore()

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-gray-50 selection:bg-none">
            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* UI Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
                <div className="pointer-events-auto">
                    <TopBar />
                    <ScreenshotButton />
                </div>

                <div className="relative pointer-events-auto">
                    <AnimatePresence mode="wait">
                        {activePanel === 'materials' && <MaterialPanel key="materials" />}
                        {activePanel === 'colors' && <ColorPanel key="colors" />}
                        {activePanel === 'objects' && <ObjectPanel key="objects" />}
                    </AnimatePresence>

                    <BottomNav />
                </div>
            </div>
        </div>
    )
}
