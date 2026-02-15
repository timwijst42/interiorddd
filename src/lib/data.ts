export type Category = {
    id: string
    name: string
}

export type Material = {
    id: string
    name: string
    texture?: string
    color?: string
}

export type ObjectItem = {
    id: string
    name: string
    model: string
}

export const CATEGORIES: Category[] = [
    { id: 'fabric', name: 'Fabric' },
    { id: 'wood', name: 'Wood' },
    { id: 'tile', name: 'Tile' },
    { id: 'paint', name: 'Paint' },
    { id: 'metal', name: 'Metal' },
]

// Mock data - will need actual assets later
export const MATERIALS: Record<string, Material[]> = {
    fabric: [
        { id: 'fabric-1', name: 'Linen Beige', color: '#e6decb' },
        { id: 'fabric-2', name: 'Canvas Grey', color: '#a0a09a' },
        { id: 'fabric-3', name: 'Velvet Blue', color: '#1a2b4c' },
        { id: 'fabric-4', name: 'Cotton White', color: '#f5f5f5' },
        { id: 'fabric-5', name: 'Wool Green', color: '#2c3e2e' },
    ],
    wood: [
        { id: 'wood-1', name: 'Oak Natural', color: '#d3b78c' },
        { id: 'wood-2', name: 'Walnut', color: '#5d4037' },
        { id: 'wood-3', name: 'Birch', color: '#f0e6d2' },
        { id: 'wood-4', name: 'Mahogany', color: '#4a171e' },
    ],
    tile: [
        { id: 'tile-1', name: 'Marble White', color: '#f5f5f5' },
        { id: 'tile-2', name: 'Slate Grey', color: '#37474f' },
        { id: 'tile-3', name: 'Terracotta', color: '#cc5a3f' },
    ],
    paint: [
        { id: 'paint-1', name: 'Matte White', color: '#ffffff' },
        { id: 'paint-2', name: 'Eggshell Cream', color: '#fffdd0' },
        { id: 'paint-3', name: 'Charcoal', color: '#212121' },
        { id: 'paint-4', name: 'Navy', color: '#000080' },
        { id: 'paint-5', name: 'Sage', color: '#9caf88' },
    ],
    metal: [
        { id: 'metal-1', name: 'Brushed Steel', color: '#b0b0b0' },
        { id: 'metal-2', name: 'Gold', color: '#ffd700' },
        { id: 'metal-3', name: 'Copper', color: '#b87333' },
        { id: 'metal-4', name: 'Black Metal', color: '#1a1a1a' },
    ],
}

export const OBJECTS: ObjectItem[] = [
    { id: 'couch', name: 'Couch', model: '/models/couch.glb' },
    { id: 'chair', name: 'Chair', model: '/models/chair.glb' },
    { id: 'table', name: 'Table', model: '/models/table.glb' },
    { id: 'cabinet', name: 'Cabinet', model: '/models/cabinet.glb' },
]
