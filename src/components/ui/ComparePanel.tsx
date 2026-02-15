'use client'

import { useStore } from "@/store/useStore"
import { Sheet } from "./Sheet"
import { cn } from "@/lib/utils"
import { Trash2, Check, ArrowLeftRight, Camera, Eye } from "lucide-react"

export function ComparePanel() {
    const {
        snapshots,
        compareMode,
        selectedSnapshots,
        deleteSnapshot,
        loadSnapshot,
        toggleCompareMode,
        toggleSnapshotSelection
    } = useStore()

    const handleScreenshot = (snapshotId?: string) => {
        if (snapshotId) {
            // Load that snapshot first, then take screenshot
            loadSnapshot(snapshotId)
            setTimeout(() => {
                const canvas = document.querySelector('canvas')
                if (canvas) {
                    const link = document.createElement('a')
                    link.setAttribute('download', `primacy-${snapshotId}.png`)
                    link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                    link.click()
                }
            }, 300)
        }
    }

    return (
        <Sheet title="Compare">
            <div className="flex flex-col gap-5 h-full">

                {/* Compare Mode Toggle */}
                {snapshots.length >= 2 && (
                    <button
                        onClick={toggleCompareMode}
                        className={cn(
                            "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-150 active:scale-95",
                            compareMode
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                        )}
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                        {compareMode ? "Exit Compare" : "Compare 2 Designs"}
                    </button>
                )}

                {/* Snapshots Grid */}
                <div className="flex-1 overflow-y-auto pb-20">
                    {snapshots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-12">
                            <Eye className="w-12 h-12 mb-3 opacity-50" />
                            <p className="text-sm font-medium">No saved designs</p>
                            <p className="text-xs mt-1 text-gray-300">Use the bookmark button ↑ to save designs</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {snapshots.map((snapshot) => {
                                const isSelected = selectedSnapshots.includes(snapshot.id)

                                return (
                                    <div
                                        key={snapshot.id}
                                        className={cn(
                                            "relative rounded-xl overflow-hidden border-2 transition-all duration-150",
                                            compareMode && isSelected && "border-blue-600 ring-2 ring-blue-600/20",
                                            compareMode && !isSelected && "border-transparent opacity-60",
                                            !compareMode && "border-transparent hover:border-gray-200"
                                        )}
                                    >
                                        <button
                                            onClick={() => {
                                                if (compareMode) {
                                                    toggleSnapshotSelection(snapshot.id)
                                                } else {
                                                    loadSnapshot(snapshot.id)
                                                }
                                            }}
                                            className="w-full aspect-[4/3] bg-gray-100 relative active:scale-[0.98] transition-transform"
                                        >
                                            {snapshot.thumbnail && (
                                                <img
                                                    src={snapshot.thumbnail}
                                                    alt={snapshot.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            )}

                                            {compareMode && isSelected && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>

                                        {/* Snapshot Info */}
                                        <div className="p-2.5 bg-white flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-gray-900 truncate">{snapshot.name}</p>
                                                <p className="text-[10px] text-gray-400">
                                                    {new Date(snapshot.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {!compareMode && (
                                                <div className="flex items-center gap-1 ml-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleScreenshot(snapshot.id)
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors active:scale-90"
                                                        aria-label="Screenshot this design"
                                                    >
                                                        <Camera className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            deleteSnapshot(snapshot.id)
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors active:scale-90"
                                                        aria-label="Delete design"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Compare Instructions */}
                {compareMode && (
                    <div className="absolute bottom-24 left-0 right-0 px-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                            <p className="text-sm text-blue-900 font-medium">
                                {selectedSnapshots.length === 0 && "Select 2 designs to compare"}
                                {selectedSnapshots.length === 1 && "Select 1 more design"}
                                {selectedSnapshots.length === 2 && "Swipe left/right to compare"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Sheet>
    )
}
