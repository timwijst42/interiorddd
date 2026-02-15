'use client'

import { useStore } from "@/store/useStore"
import { OBJECTS } from "@/lib/data"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"
import { Sofa, Armchair, Table, DoorOpen, Square, Layers, Lamp, RectangleHorizontal, BookOpen, CircleDot } from "lucide-react"

const OBJECT_ICONS: Record<string, typeof Sofa> = {
    couch: Sofa,
    armchair: Armchair,
    chair: BookOpen,
    ottoman: RectangleHorizontal,
    table: Table,
    shelf: Layers,
    cabinet: DoorOpen,
    lamp: Lamp,
    rug: Square,
    wall: Square,
    floor: CircleDot,
}

export function ObjectPanel() {
    const { currentObject, setObject } = useStore()

    return (
        <Sheet title="Objects">
            <div className="grid grid-cols-3 gap-3">
                {OBJECTS.map((obj) => {
                    const Icon = OBJECT_ICONS[obj.id] || Square
                    return (
                        <button
                            key={obj.id}
                            onClick={() => setObject(obj.id)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95",
                                currentObject === obj.id
                                    ? "border-black bg-gray-50 shadow-md"
                                    : "border-transparent bg-gray-50/50 active:bg-gray-100"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                currentObject === obj.id ? "bg-black text-white" : "bg-white text-gray-400 shadow-sm"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className={cn(
                                "text-[11px] font-medium",
                                currentObject === obj.id ? "text-black" : "text-gray-500"
                            )}>
                                {obj.name}
                            </span>
                        </button>
                    )
                })}
            </div>
        </Sheet>
    )
}
