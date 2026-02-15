export type Category = {
    id: string
    name: string
}

export type Material = {
    id: string
    name: string
    color: string
    textureType: 'wood' | 'metal' | 'fabric' | 'tile' | 'paint' | 'stone' | 'plastic'
    roughness: number
    metalness: number
}

export type ColorPreset = {
    hex: string
    name: string
}

export type ObjectItem = {
    id: string
    name: string
}

export const CATEGORIES: Category[] = [
    { id: 'wood', name: 'Wood' },
    { id: 'metal', name: 'Metal' },
    { id: 'fabric', name: 'Fabric' },
    { id: 'stone', name: 'Stone' },
    { id: 'plastic', name: 'Plastic' },
    { id: 'paint', name: 'Paint' },
]

export const MATERIALS: Record<string, Material[]> = {
    wood: [
        { id: 'wood-oak-light', name: 'Oak Light', color: '#d4b88c', textureType: 'wood', roughness: 0.55, metalness: 0 },
        { id: 'wood-oak-medium', name: 'Oak Medium', color: '#b8934a', textureType: 'wood', roughness: 0.5, metalness: 0 },
        { id: 'wood-oak-dark', name: 'Oak Dark', color: '#8a6a30', textureType: 'wood', roughness: 0.48, metalness: 0 },
        { id: 'wood-walnut-light', name: 'Walnut Light', color: '#8b6e4e', textureType: 'wood', roughness: 0.5, metalness: 0 },
        { id: 'wood-walnut-dark', name: 'Walnut Dark', color: '#5d4037', textureType: 'wood', roughness: 0.45, metalness: 0 },
        { id: 'wood-mahogany', name: 'Mahogany', color: '#3e1c14', textureType: 'wood', roughness: 0.42, metalness: 0 },
        { id: 'wood-mahogany-red', name: 'Mahogany Red', color: '#6b1c0e', textureType: 'wood', roughness: 0.44, metalness: 0 },
        { id: 'wood-birch', name: 'Birch Light', color: '#f0e6d2', textureType: 'wood', roughness: 0.6, metalness: 0 },
        { id: 'wood-pine', name: 'Pine Honey', color: '#c8a45e', textureType: 'wood', roughness: 0.58, metalness: 0 },
        { id: 'wood-teak', name: 'Teak Warm', color: '#9a7340', textureType: 'wood', roughness: 0.5, metalness: 0 },
    ],
    metal: [
        { id: 'metal-steel-brushed', name: 'Brushed Steel', color: '#a8a8a8', textureType: 'metal', roughness: 0.3, metalness: 0.85 },
        { id: 'metal-steel-polished', name: 'Polished Steel', color: '#c8c8c8', textureType: 'metal', roughness: 0.1, metalness: 0.95 },
        { id: 'metal-steel-matte', name: 'Matte Steel', color: '#808080', textureType: 'metal', roughness: 0.5, metalness: 0.7 },
        { id: 'metal-brass-bright', name: 'Brass Bright', color: '#d4a84e', textureType: 'metal', roughness: 0.2, metalness: 0.9 },
        { id: 'metal-brass-aged', name: 'Brass Aged', color: '#9a7a3a', textureType: 'metal', roughness: 0.4, metalness: 0.75 },
        { id: 'metal-copper-new', name: 'Copper New', color: '#c47040', textureType: 'metal', roughness: 0.25, metalness: 0.85 },
        { id: 'metal-copper-aged', name: 'Copper Patina', color: '#608a6a', textureType: 'metal', roughness: 0.5, metalness: 0.6 },
        { id: 'metal-black', name: 'Matte Black', color: '#2a2a2a', textureType: 'metal', roughness: 0.5, metalness: 0.7 },
        { id: 'metal-chrome', name: 'Chrome Mirror', color: '#d0d0d0', textureType: 'metal', roughness: 0.08, metalness: 0.95 },
    ],
    fabric: [
        { id: 'fabric-linen-nat', name: 'Linen Natural', color: '#ddd5c0', textureType: 'fabric', roughness: 0.9, metalness: 0 },
        { id: 'fabric-linen-white', name: 'Linen White', color: '#f0ece0', textureType: 'fabric', roughness: 0.88, metalness: 0 },
        { id: 'fabric-velvet-navy', name: 'Velvet Navy', color: '#1a2744', textureType: 'fabric', roughness: 0.95, metalness: 0 },
        { id: 'fabric-velvet-emerald', name: 'Velvet Emerald', color: '#1a4a2e', textureType: 'fabric', roughness: 0.95, metalness: 0 },
        { id: 'fabric-velvet-wine', name: 'Velvet Wine', color: '#5a1a2a', textureType: 'fabric', roughness: 0.95, metalness: 0 },
        { id: 'fabric-leather-cognac', name: 'Leather Cognac', color: '#8b4513', textureType: 'fabric', roughness: 0.6, metalness: 0 },
        { id: 'fabric-leather-black', name: 'Leather Black', color: '#1c1c1c', textureType: 'fabric', roughness: 0.55, metalness: 0.05 },
        { id: 'fabric-leather-tan', name: 'Leather Tan', color: '#c09060', textureType: 'fabric', roughness: 0.58, metalness: 0 },
        { id: 'fabric-wool-grey', name: 'Wool Grey', color: '#88857f', textureType: 'fabric', roughness: 0.85, metalness: 0 },
    ],
    stone: [
        { id: 'stone-marble-white', name: 'Carrara Marble', color: '#f0ece4', textureType: 'stone', roughness: 0.1, metalness: 0 },
        { id: 'stone-marble-grey', name: 'Grey Marble', color: '#c0bab0', textureType: 'stone', roughness: 0.12, metalness: 0 },
        { id: 'stone-granite-black', name: 'Black Granite', color: '#1e1e1e', textureType: 'stone', roughness: 0.15, metalness: 0.05 },
        { id: 'stone-granite-speckle', name: 'Speckled Granite', color: '#707070', textureType: 'stone', roughness: 0.2, metalness: 0.03 },
        { id: 'stone-slate-dark', name: 'Slate Dark', color: '#3a3f47', textureType: 'stone', roughness: 0.3, metalness: 0 },
        { id: 'stone-travertine', name: 'Travertine', color: '#d8c8a8', textureType: 'stone', roughness: 0.35, metalness: 0 },
        { id: 'stone-terracotta', name: 'Terracotta', color: '#c0593b', textureType: 'stone', roughness: 0.5, metalness: 0 },
    ],
    plastic: [
        { id: 'plastic-white', name: 'Gloss White', color: '#f5f5f5', textureType: 'plastic', roughness: 0.15, metalness: 0 },
        { id: 'plastic-black', name: 'Matte Black', color: '#1a1a1a', textureType: 'plastic', roughness: 0.4, metalness: 0 },
        { id: 'plastic-grey', name: 'Cool Grey', color: '#8a8a8a', textureType: 'plastic', roughness: 0.25, metalness: 0 },
        { id: 'plastic-red', name: 'Signal Red', color: '#cc2020', textureType: 'plastic', roughness: 0.2, metalness: 0 },
        { id: 'plastic-navy', name: 'Deep Navy', color: '#1a2040', textureType: 'plastic', roughness: 0.22, metalness: 0 },
    ],
    paint: [
        { id: 'paint-white', name: 'Matte White', color: '#f8f8f8', textureType: 'paint', roughness: 0.7, metalness: 0 },
        { id: 'paint-cream', name: 'Eggshell Cream', color: '#f5edd0', textureType: 'paint', roughness: 0.5, metalness: 0 },
        { id: 'paint-charcoal', name: 'Charcoal Matte', color: '#303030', textureType: 'paint', roughness: 0.65, metalness: 0 },
        { id: 'paint-navy', name: 'Navy Satin', color: '#1a2552', textureType: 'paint', roughness: 0.35, metalness: 0 },
        { id: 'paint-sage', name: 'Sage Green', color: '#8fa878', textureType: 'paint', roughness: 0.5, metalness: 0 },
        { id: 'paint-terracotta', name: 'Terracotta Warm', color: '#c47030', textureType: 'paint', roughness: 0.55, metalness: 0 },
    ],
}

export const COLOR_PRESETS: ColorPreset[] = [
    { hex: '#ffffff', name: 'No Tint' },
    { hex: '#f5f0e8', name: 'Warm' },
    { hex: '#e8ecf5', name: 'Cool' },
    { hex: '#f5e8e8', name: 'Blush' },
    { hex: '#e0e0e0', name: 'Silver' },
    { hex: '#c0392b', name: 'Crimson' },
    { hex: '#e74c3c', name: 'Coral' },
    { hex: '#8e44ad', name: 'Purple' },
    { hex: '#2980b9', name: 'Azure' },
    { hex: '#1abc9c', name: 'Teal' },
    { hex: '#27ae60', name: 'Forest' },
    { hex: '#f39c12', name: 'Amber' },
    { hex: '#e67e22', name: 'Burnt Orange' },
    { hex: '#2c3e50', name: 'Midnight' },
    { hex: '#795548', name: 'Walnut' },
    { hex: '#607d8b', name: 'Slate' },
]

export const OBJECTS: ObjectItem[] = [
    { id: 'couch', name: 'Couch' },
    { id: 'armchair', name: 'Armchair' },
    { id: 'chair', name: 'Chair' },
    { id: 'ottoman', name: 'Ottoman' },
    { id: 'table', name: 'Table' },
    { id: 'shelf', name: 'Shelf' },
    { id: 'cabinet', name: 'Cabinet' },
    { id: 'lamp', name: 'Lamp' },
    { id: 'rug', name: 'Rug' },
    { id: 'wall', name: 'Wall' },
    { id: 'floor', name: 'Floor' },
]
