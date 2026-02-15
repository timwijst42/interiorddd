import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Snapshot {
    id: string
    name: string
    timestamp: number
    category: string
    material: string
    color: string
    object: string
    thumbnail?: string
}

interface AppState {
    currentCategory: string
    currentMaterial: string
    currentColor: string
    currentObject: string
    activePanel: 'materials' | 'colors' | 'objects' | 'compare' | null

    // Rotation
    isRotating: boolean

    // Comparison state
    snapshots: Snapshot[]
    compareMode: boolean
    selectedSnapshots: string[] // Max 2 IDs

    setCategory: (id: string) => void
    setMaterial: (id: string) => void
    setColor: (hex: string) => void
    setObject: (id: string) => void
    setActivePanel: (panel: 'materials' | 'colors' | 'objects' | 'compare' | null) => void
    toggleRotation: () => void

    // Comparison actions
    addSnapshot: (name: string, thumbnail?: string) => void
    deleteSnapshot: (id: string) => void
    loadSnapshot: (id: string) => void
    toggleCompareMode: () => void
    toggleSnapshotSelection: (id: string) => void

    reset: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentCategory: 'wood',
            currentMaterial: 'wood-oak-light',
            currentColor: '#ffffff',
            currentObject: 'couch',
            activePanel: null,
            isRotating: true,

            snapshots: [],
            compareMode: false,
            selectedSnapshots: [],

            setCategory: (id) => set({ currentCategory: id }),
            setMaterial: (id) => set({ currentMaterial: id }),
            setColor: (hex) => set({ currentColor: hex }),
            setObject: (id) => set({ currentObject: id }),
            setActivePanel: (panel) => set({ activePanel: panel }),
            toggleRotation: () => set((s) => ({ isRotating: !s.isRotating })),

            addSnapshot: (name, thumbnail) => {
                const state = get()
                const snapshot: Snapshot = {
                    id: Date.now().toString(),
                    name,
                    timestamp: Date.now(),
                    category: state.currentCategory,
                    material: state.currentMaterial,
                    color: state.currentColor,
                    object: state.currentObject,
                    thumbnail,
                }
                set({ snapshots: [...state.snapshots, snapshot] })
            },

            deleteSnapshot: (id) => {
                const state = get()
                set({
                    snapshots: state.snapshots.filter(s => s.id !== id),
                    selectedSnapshots: state.selectedSnapshots.filter(sid => sid !== id)
                })
            },

            loadSnapshot: (id) => {
                const state = get()
                const snapshot = state.snapshots.find(s => s.id === id)
                if (snapshot) {
                    set({
                        currentCategory: snapshot.category,
                        currentMaterial: snapshot.material,
                        currentColor: snapshot.color,
                        currentObject: snapshot.object,
                    })
                }
            },

            toggleCompareMode: () => {
                const state = get()
                set({
                    compareMode: !state.compareMode,
                    selectedSnapshots: state.compareMode ? [] : state.selectedSnapshots
                })
            },

            toggleSnapshotSelection: (id) => {
                const state = get()
                const isSelected = state.selectedSnapshots.includes(id)

                if (isSelected) {
                    set({ selectedSnapshots: state.selectedSnapshots.filter(sid => sid !== id) })
                } else if (state.selectedSnapshots.length < 2) {
                    set({ selectedSnapshots: [...state.selectedSnapshots, id] })
                }
            },

            reset: () => set({
                currentCategory: 'wood',
                currentMaterial: 'wood-oak-light',
                currentColor: '#ffffff',
                currentObject: 'couch',
                activePanel: null,
                isRotating: true,
                compareMode: false,
                selectedSnapshots: []
            }),
        }),
        {
            name: 'primacy-lite-storage',
        }
    )
)
