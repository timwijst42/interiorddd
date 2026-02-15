import { useStore } from "@/store/useStore"
import { CATEGORIES, MATERIALS } from "@/lib/data"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"

export function MaterialPanel() {
    const { currentCategory, currentMaterial, setCategory, setMaterial } = useStore()

    const activeMaterials = MATERIALS[currentCategory] || []

    return (
        <Sheet title="Materials" className="h-[45vh]">
            <div className="space-y-6">
                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                                currentCategory === cat.id
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[20vh] pb-24">
                    {activeMaterials.map((mat) => (
                        <button
                            key={mat.id}
                            onClick={() => setMaterial(mat.id)}
                            className={cn(
                                "group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all text-left",
                                currentMaterial === mat.id
                                    ? "border-black shadow-md ring-1 ring-black/5"
                                    : "border-transparent hover:border-gray-200"
                            )}
                        >
                            <div
                                className="absolute inset-0 bg-gray-100"
                                style={{ backgroundColor: mat.color }} // Fallback/Tint if no texture
                            />
                            {/* If we have textures, img goes here */}
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                                <span className="text-white text-xs font-medium">{mat.name}</span>
                            </div>

                            {currentMaterial === mat.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Sheet>
    )
}
