import * as THREE from 'three'

// Cache to avoid regenerating textures
const textureCache = new Map<string, THREE.CanvasTexture>()

function getOrCreate(key: string, generator: () => HTMLCanvasElement): THREE.CanvasTexture {
    if (textureCache.has(key)) return textureCache.get(key)!
    const canvas = generator()
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    textureCache.set(key, texture)
    return texture
}

// Simple seeded noise
function noise2D(x: number, y: number, seed: number = 0): number {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
    return n - Math.floor(n)
}

function smoothNoise(x: number, y: number, seed: number = 0): number {
    const ix = Math.floor(x), iy = Math.floor(y)
    const fx = x - ix, fy = y - iy
    const a = noise2D(ix, iy, seed)
    const b = noise2D(ix + 1, iy, seed)
    const c = noise2D(ix, iy + 1, seed)
    const d = noise2D(ix + 1, iy + 1, seed)
    const ux = fx * fx * (3 - 2 * fx)
    const uy = fy * fy * (3 - 2 * fy)
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
}

function fbm(x: number, y: number, octaves: number = 4, seed: number = 0): number {
    let val = 0, amp = 0.5, freq = 1
    for (let i = 0; i < octaves; i++) {
        val += amp * smoothNoise(x * freq, y * freq, seed + i * 100)
        amp *= 0.5
        freq *= 2
    }
    return val
}

function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
}

// ─── Wood Texture ─────────────────────
function generateWoodAlbedo(baseColor: string, seed: number = 42): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)

    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const grain = fbm(x * 0.02, y * 0.15 + x * 0.005, 5, seed)
            const ring = Math.sin((x * 0.05 + grain * 8)) * 0.5 + 0.5
            const detail = noise2D(x * 0.3, y * 0.3, seed + 50) * 0.1
            const v = ring * 0.3 + grain * 0.5 + 0.4 + detail
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generateWoodRoughness(seed: number = 42): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const v = fbm(x * 0.03, y * 0.2, 3, seed) * 0.3 + 0.5
            const val = Math.floor(v * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = val
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Metal Texture ────────────────────
function generateMetalAlbedo(baseColor: string, seed: number = 10): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Brushed metal: horizontal streaks
            const streak = smoothNoise(x * 0.01, y * 0.5, seed) * 0.15
            const micro = noise2D(x * 2, y * 2, seed + 30) * 0.05
            const v = 0.85 + streak + micro
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generateMetalRoughness(seed: number = 10): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const brushed = smoothNoise(x * 0.01, y * 0.8, seed) * 0.3
            const val = Math.floor((0.2 + brushed) * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = Math.min(255, val)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Fabric Texture ───────────────────
function generateFabricAlbedo(baseColor: string, seed: number = 77): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Weave pattern
            const weaveX = Math.sin(x * 0.8) * 0.03
            const weaveY = Math.sin(y * 0.8) * 0.03
            const weave = (weaveX + weaveY) + 0.06
            const fuzz = noise2D(x * 0.5, y * 0.5, seed) * 0.08
            const v = 0.9 + weave + fuzz
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generateFabricRoughness(seed: number = 77): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const weave = Math.sin(x * 0.8) * Math.sin(y * 0.8) * 0.1
            const val = Math.floor((0.8 + weave + noise2D(x, y, seed) * 0.1) * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = Math.min(255, val)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Tile Texture ─────────────────────
function generateTileAlbedo(baseColor: string, seed: number = 33): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    const tileSize = 64
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Grid lines
            const gx = x % tileSize, gy = y % tileSize
            const isGrout = gx < 2 || gy < 2
            const marble = fbm(x * 0.01 + y * 0.005, y * 0.02, 4, seed) * 0.15

            const i = (y * size + x) * 4
            if (isGrout) {
                imageData.data[i] = br * 0.4
                imageData.data[i + 1] = bg * 0.4
                imageData.data[i + 2] = bb * 0.4
            } else {
                const v = 0.9 + marble
                imageData.data[i] = Math.min(255, br * v)
                imageData.data[i + 1] = Math.min(255, bg * v)
                imageData.data[i + 2] = Math.min(255, bb * v)
            }
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generateTileRoughness(seed: number = 33): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    const tileSize = 64
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const gx = x % tileSize, gy = y % tileSize
            const isGrout = gx < 2 || gy < 2
            const val = isGrout ? 200 : Math.floor((0.1 + noise2D(x * 0.1, y * 0.1, seed) * 0.1) * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = val
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Paint Texture ────────────────────
function generatePaintAlbedo(baseColor: string, seed: number = 55): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const stipple = noise2D(x * 0.3, y * 0.3, seed) * 0.06
            const v = 0.95 + stipple
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generatePaintRoughness(seed: number = 55): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const val = Math.floor((0.4 + noise2D(x * 0.2, y * 0.2, seed) * 0.15) * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = val
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Stone Texture ────────────────────
function generateStoneAlbedo(baseColor: string, seed: number = 22): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Veining
            const vein = Math.abs(Math.sin(fbm(x * 0.015, y * 0.01, 5, seed) * 6)) * 0.12
            // Speckle
            const speckle = noise2D(x * 0.8, y * 0.8, seed + 20) * 0.06
            const base = fbm(x * 0.008, y * 0.008, 3, seed + 40) * 0.1
            const v = 0.88 + vein + speckle + base
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generateStoneRoughness(seed: number = 22): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const v = 0.15 + fbm(x * 0.02, y * 0.02, 3, seed) * 0.2 + noise2D(x * 0.5, y * 0.5, seed) * 0.08
            const val = Math.floor(v * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = Math.min(255, val)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Plastic Texture ──────────────────
function generatePlasticAlbedo(baseColor: string, seed: number = 88): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const [br, bg, bb] = hexToRgb(baseColor)
    const imageData = ctx.createImageData(size, size)

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const micro = noise2D(x * 0.5, y * 0.5, seed) * 0.02
            const v = 0.98 + micro
            const i = (y * size + x) * 4
            imageData.data[i] = Math.min(255, br * v)
            imageData.data[i + 1] = Math.min(255, bg * v)
            imageData.data[i + 2] = Math.min(255, bb * v)
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

function generatePlasticRoughness(seed: number = 88): HTMLCanvasElement {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const val = Math.floor((0.12 + noise2D(x * 0.3, y * 0.3, seed) * 0.05) * 255)
            const i = (y * size + x) * 4
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = val
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Normal Map (from any height map) ──
function generateNormalFromCanvas(src: HTMLCanvasElement, strength: number = 2): HTMLCanvasElement {
    const size = src.width
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const srcCtx = src.getContext('2d')!
    const srcData = srcCtx.getImageData(0, 0, size, size).data
    const imageData = ctx.createImageData(size, size)

    const getHeight = (x: number, y: number) => {
        const cx = ((x % size) + size) % size
        const cy = ((y % size) + size) % size
        return srcData[(cy * size + cx) * 4] / 255
    }

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const l = getHeight(x - 1, y)
            const r = getHeight(x + 1, y)
            const t = getHeight(x, y - 1)
            const b = getHeight(x, y + 1)
            const dx = (l - r) * strength
            const dy = (t - b) * strength
            const i = (y * size + x) * 4
            imageData.data[i] = Math.floor((dx * 0.5 + 0.5) * 255)
            imageData.data[i + 1] = Math.floor((dy * 0.5 + 0.5) * 255)
            imageData.data[i + 2] = 255 // z always up
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas
}

// ─── Public API ───────────────────────
export interface PBRTextures {
    albedo: THREE.CanvasTexture
    roughnessMap: THREE.CanvasTexture
    normalMap: THREE.CanvasTexture
}

export function generatePBRTextures(
    textureType: string,
    baseColor: string,
    materialId: string
): PBRTextures {
    const key = `${materialId}-${baseColor}`

    const albedo = getOrCreate(`${key}-albedo`, () => {
        switch (textureType) {
            case 'wood': return generateWoodAlbedo(baseColor, hashCode(materialId))
            case 'metal': return generateMetalAlbedo(baseColor, hashCode(materialId))
            case 'fabric': return generateFabricAlbedo(baseColor, hashCode(materialId))
            case 'tile': return generateTileAlbedo(baseColor, hashCode(materialId))
            case 'stone': return generateStoneAlbedo(baseColor, hashCode(materialId))
            case 'plastic': return generatePlasticAlbedo(baseColor, hashCode(materialId))
            case 'paint': return generatePaintAlbedo(baseColor, hashCode(materialId))
            default: return generatePaintAlbedo(baseColor, hashCode(materialId))
        }
    })

    const roughnessMap = getOrCreate(`${key}-rough`, () => {
        switch (textureType) {
            case 'wood': return generateWoodRoughness(hashCode(materialId))
            case 'metal': return generateMetalRoughness(hashCode(materialId))
            case 'fabric': return generateFabricRoughness(hashCode(materialId))
            case 'tile': return generateTileRoughness(hashCode(materialId))
            case 'stone': return generateStoneRoughness(hashCode(materialId))
            case 'plastic': return generatePlasticRoughness(hashCode(materialId))
            case 'paint': return generatePaintRoughness(hashCode(materialId))
            default: return generatePaintRoughness(hashCode(materialId))
        }
    })

    const normalMap = getOrCreate(`${key}-normal`, () => {
        return generateNormalFromCanvas(albedo.image as HTMLCanvasElement, textureType === 'fabric' ? 1.5 : 2)
    })

    return { albedo, roughnessMap, normalMap }
}

function hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + c
        hash |= 0
    }
    return Math.abs(hash)
}
