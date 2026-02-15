'use client'

import { useStore } from "@/store/useStore"
import { CATEGORIES, MATERIALS } from "@/lib/data"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"

export function MaterialPanel() {
    const { currentCategory, currentMaterial, setCategory, setMaterial } = useStore()
    const activeMaterials = MATERIALS[currentCategory] || []

    return (
        <Sheet title="Materials">
            <div className="flex flex-col gap-4">
                {/* Categories - horizontal scroll */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 active:scale-95",
                                currentCategory === cat.id
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-600"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {activeMaterials.map((mat) => (
                        <button
                            key={mat.id}
                            onClick={() => setMaterial(mat.id)}
                            className={cn(
                                "relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-150 active:scale-[0.97]",
                                currentMaterial === mat.id
                                    ? "border-black shadow-lg ring-1 ring-black/10"
                                    : "border-transparent"
                            )}
                        >
                            <div className="absolute inset-0" style={{ backgroundColor: mat.color }} />

                            {/* Texture overlay */}
                            {mat.textureType && (
                                <div className={cn(
                                    "absolute inset-0 opacity-30",
                                    mat.textureType === 'wood' && "bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(0,0,0,0.1)_3px,rgba(0,0,0,0.1)_4px)]",
                                    mat.textureType === 'metal' && "bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.15)_1px,rgba(255,255,255,0.15)_2px)]",
                                    mat.textureType === 'fabric' && "bg-[repeating-conic-gradient(rgba(0,0,0,0.05)_0%_25%,transparent_0%_50%)_0_0/6px_6px]",
                                    mat.textureType === 'stone' && "bg-[radial-gradient(circle_2px,rgba(0,0,0,0.08)_1px,transparent_1px)]",
                                    mat.textureType === 'plastic' && "bg-gradient-to-br from-white/10 to-transparent",
                                    mat.textureType === 'paint' && "bg-[radial-gradient(circle_1px,rgba(0,0,0,0.03)_1px,transparent_1px)]",
                                )} />
                            )}

                            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                                <span className="text-white text-xs font-medium leading-tight">{mat.name}</span>
                            </div>

                            {currentMaterial === mat.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Sheet>
    )
}
