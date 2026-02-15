'use client'

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef, useEffect, useState } from "react"

interface SheetProps {
    children: React.ReactNode
    className?: string
    title?: string
}

// Snap stops as % from bottom of viewport
const SNAP_POINTS = [35, 60, 92] // collapsed, half, full
const DEFAULT_SNAP = 0 // index into SNAP_POINTS

function getSnapPx(vh: number) {
    if (typeof window === 'undefined') return 300
    return (vh / 100) * window.innerHeight
}

function closestSnap(currentHeight: number): number {
    let closest = 0
    let minDist = Infinity
    for (let i = 0; i < SNAP_POINTS.length; i++) {
        const px = getSnapPx(SNAP_POINTS[i])
        const dist = Math.abs(currentHeight - px)
        if (dist < minDist) {
            minDist = dist
            closest = i
        }
    }
    return closest
}

export function Sheet({ children, className, title }: SheetProps) {
    const [snapIndex, setSnapIndex] = useState(DEFAULT_SNAP)
    const [isDragging, setIsDragging] = useState(false)
    const controls = useAnimation()
    const contentRef = useRef<HTMLDivElement>(null)

    const currentHeight = getSnapPx(SNAP_POINTS[snapIndex])

    // Animate to current snap
    useEffect(() => {
        controls.start({
            height: getSnapPx(SNAP_POINTS[snapIndex]),
            transition: { type: "spring", damping: 30, stiffness: 300 }
        })
    }, [snapIndex, controls])

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false)

        const velocity = info.velocity.y
        const currentSnapPx = getSnapPx(SNAP_POINTS[snapIndex])
        const draggedHeight = currentSnapPx - info.offset.y

        // If fast swipe, go to next/prev snap
        if (Math.abs(velocity) > 500) {
            if (velocity < 0 && snapIndex < SNAP_POINTS.length - 1) {
                setSnapIndex(snapIndex + 1)
                return
            }
            if (velocity > 0 && snapIndex > 0) {
                setSnapIndex(snapIndex - 1)
                return
            }
        }

        // Otherwise snap to closest
        const newIndex = closestSnap(draggedHeight)
        setSnapIndex(newIndex)
    }

    return (
        <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ height: getSnapPx(SNAP_POINTS[DEFAULT_SNAP]) }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ touchAction: 'none' }}
            className={cn(
                "absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] shadow-2xl z-40 flex flex-col overflow-hidden",
                className
            )}
        >
            {/* Drag Handle - only this is draggable */}
            <div className="flex-shrink-0 flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Scrollable Content */}
            <div
                ref={contentRef}
                className="flex-1 overflow-y-auto overscroll-contain px-5 pb-24"
                style={{ touchAction: isDragging ? 'none' : 'pan-y' }}
                onPointerDown={(e) => {
                    // Prevent sheet drag when scrolling content
                    if (contentRef.current && contentRef.current.scrollTop > 0) {
                        e.stopPropagation()
                    }
                }}
            >
                {children}
            </div>
        </motion.div>
    )
}
