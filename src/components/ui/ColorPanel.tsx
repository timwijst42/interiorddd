'use client'

import { useStore } from "@/store/useStore"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { COLOR_PRESETS } from "@/lib/data"

export function ColorPanel() {
    const { currentColor, setColor } = useStore()

    return (
        <Sheet title="Colors">
            <div className="flex flex-col gap-5">

                <p className="text-xs text-gray-400 text-center -mt-1">Tints the selected material — White = natural look</p>

                {/* Custom Picker */}
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-200 flex-shrink-0">
                        <input
                            type="color"
                            value={currentColor}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Custom Tint</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{currentColor}</p>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Preset Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {COLOR_PRESETS.map((preset) => (
                        <button
                            key={preset.hex}
                            onClick={() => setColor(preset.hex)}
                            className={cn(
                                "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150 active:scale-95",
                                currentColor === preset.hex
                                    ? "bg-gray-100 ring-2 ring-black ring-offset-1"
                                    : ""
                            )}
                        >
                            <div
                                className="w-10 h-10 rounded-lg shadow-sm border border-black/10 relative"
                                style={{ backgroundColor: preset.hex }}
                            >
                                {currentColor === preset.hex && (
                                    <Check className={cn(
                                        "absolute inset-0 m-auto w-4 h-4",
                                        ['#ffffff', '#f5f0e8', '#e8ecf5', '#f5e8e8', '#e0e0e0', '#f39c12'].includes(preset.hex) ? "text-black" : "text-white"
                                    )} />
                                )}
                            </div>
                            <span className="text-[10px] text-gray-600 leading-tight text-center line-clamp-1">{preset.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Sheet>
    )
}
