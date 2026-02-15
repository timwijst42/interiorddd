import { useStore } from "@/store/useStore"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"
import { Check, Plus } from "lucide-react"

const PRESET_COLORS = [
    '#ffffff', '#f5f5f5', '#e0e0e0', '#9e9e9e', '#616161', '#212121', // Grayscale
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', // Cool
    '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', // Greens
    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', // Warm/Earth
]

export function ColorPanel() {
    const { currentColor, setColor } = useStore()

    return (
        <Sheet title="Colors" className="h-[40vh]">
            <div className="flex flex-col gap-6">

                {/* Custom Picker Row */}
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-200">
                        <input
                            type="color"
                            value={currentColor}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Custom Color</p>
                        <p className="text-xs text-gray-500 uppercase">{currentColor}</p>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Presets */}
                <div className="grid grid-cols-6 gap-3 overflow-y-auto pb-20">
                    {PRESET_COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => setColor(color)}
                            className={cn(
                                "relative aspect-square rounded-full border border-black/5 shadow-sm transition-transform active:scale-95",
                                currentColor === color && "ring-2 ring-black ring-offset-2"
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                        >
                            {currentColor === color && (
                                <Check className={cn(
                                    "absolute inset-0 m-auto w-4 h-4",
                                    // Contrast check for icon color
                                    ['#ffffff', '#f5f5f5', '#e0e0e0', '#ffeb3b'].includes(color) ? "text-black" : "text-white"
                                )} />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Sheet>
    )
}
