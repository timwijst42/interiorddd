import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
    currentCategory: string
    currentMaterial: string
    currentColor: string
    currentObject: string
    activePanel: 'materials' | 'colors' | 'objects' | null

    setCategory: (id: string) => void
    setMaterial: (id: string) => void
    setColor: (hex: string) => void
    setObject: (id: string) => void
    setActivePanel: (panel: 'materials' | 'colors' | 'objects' | null) => void
    reset: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            currentCategory: 'fabric',
            currentMaterial: 'fabric-1',
            currentColor: '#ffffff',
            currentObject: 'couch',
            activePanel: null,

            setCategory: (id) => set({ currentCategory: id }),
            setMaterial: (id) => set({ currentMaterial: id }),
            setColor: (hex) => set({ currentColor: hex }),
            setObject: (id) => set({ currentObject: id }),
            setActivePanel: (panel) => set({ activePanel: panel }),
            reset: () => set({
                currentCategory: 'fabric',
                currentMaterial: 'fabric-1',
                currentColor: '#ffffff',
                currentObject: 'couch',
                activePanel: null
            }),
        }),
        {
            name: 'material-flow-storage',
        }
    )
)
