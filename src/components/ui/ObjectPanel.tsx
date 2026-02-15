import { useStore } from "@/store/useStore"
import { OBJECTS } from "@/lib/data"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"

export function ObjectPanel() {
    const { currentObject, setObject } = useStore()

    return (
        <Sheet title="Objects" className="h-[45vh]">
            <div className="grid grid-cols-2 gap-4 pb-24 overflow-y-auto h-full">
                {OBJECTS.map((obj) => (
                    <button
                        key={obj.id}
                        onClick={() => setObject(obj.id)}
                        className={cn(
                            "flex flex-col items-center p-4 rounded-2xl border-2 transition-all bg-gray-50",
                            currentObject === obj.id
                                ? "border-black bg-white shadow-md"
                                : "border-transparent hover:bg-gray-100"
                        )}
                    >
                        {/* Placeholder Icon for Model */}
                        <div className="w-20 h-20 bg-white rounded-xl mb-3 shadow-inner flex items-center justify-center text-gray-300">
                            <span className="text-2xl">📦</span>
                        </div>

                        <span className={cn(
                            "text-sm font-medium",
                            currentObject === obj.id ? "text-black" : "text-gray-600"
                        )}>
                            {obj.name}
                        </span>
                    </button>
                ))}
            </div>
        </Sheet>
    )
}
