'use client'

import { useStore } from "@/store/useStore"
import { useRef, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MATERIALS } from "@/lib/data"
import { generatePBRTextures, PBRTextures } from "@/lib/proceduralTextures"

// ─── HSL Tinting ────────────────────
function hexToHSL(hex: string): [number, number, number] {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
        }
    }
    return [h, s, l]
}

function blendColorWithTint(baseHex: string, tintHex: string): THREE.Color {
    if (tintHex === '#ffffff') return new THREE.Color(baseHex)
    const [, bs, bl] = hexToHSL(baseHex)
    const [th, ts, tl] = hexToHSL(tintHex)
    const h = th
    const s = bs * 0.3 + ts * 0.7
    const l = bl * 0.6 + tl * 0.4
    const color = new THREE.Color()
    color.setHSL(h, s, l)
    return color
}

// ─── PBR Mesh ───────────────────────
function PBRMesh({ geometry, position, rotation, pbr, color, roughness, metalness, castShadow = true, receiveShadow = true }: {
    geometry: React.ReactNode
    position?: [number, number, number]
    rotation?: [number, number, number]
    pbr: PBRTextures | null
    color: THREE.Color
    roughness: number
    metalness: number
    castShadow?: boolean
    receiveShadow?: boolean
}) {
    const matRef = useRef<THREE.MeshStandardMaterial>(null)

    useEffect(() => {
        if (!matRef.current || !pbr) return
        matRef.current.map = pbr.albedo
        matRef.current.roughnessMap = pbr.roughnessMap
        matRef.current.normalMap = pbr.normalMap
        matRef.current.normalScale = new THREE.Vector2(0.5, 0.5)
        matRef.current.color.copy(color)
        matRef.current.roughness = roughness
        matRef.current.metalness = metalness
        matRef.current.needsUpdate = true
    }, [pbr, color, roughness, metalness])

    return (
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={position} rotation={rotation}>
            {geometry}
            <meshStandardMaterial ref={matRef} color={color} roughness={roughness} metalness={metalness} />
        </mesh>
    )
}

// ─── Accent Mesh ────────────────────
function AccentMesh({ geometry, position, color = "#333", roughness = 0.4, metalness = 0.5 }: {
    geometry: React.ReactNode
    position: [number, number, number]
    color?: string
    roughness?: number
    metalness?: number
}) {
    return (
        <mesh castShadow position={position}>
            {geometry}
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </mesh>
    )
}

// ─── Object Props ───────────────────
interface ObjProps { pbr: PBRTextures | null; color: THREE.Color; roughness: number; metalness: number }

// ─── Couch ──────────────────────────
function Couch({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            <PBRMesh {...mp} position={[0, 0.25, 0]} geometry={<boxGeometry args={[1.8, 0.25, 0.8]} />} />
            <PBRMesh {...mp} position={[0, 0.6, -0.3]} geometry={<boxGeometry args={[1.8, 0.5, 0.15]} />} />
            <PBRMesh {...mp} position={[-0.85, 0.4, 0]} geometry={<boxGeometry args={[0.12, 0.3, 0.8]} />} />
            <PBRMesh {...mp} position={[0.85, 0.4, 0]} geometry={<boxGeometry args={[0.12, 0.3, 0.8]} />} />
            {([[-0.75, 0.06, 0.3], [0.75, 0.06, 0.3], [-0.75, 0.06, -0.3], [0.75, 0.06, -0.3]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.03, 0.03, 0.12, 8]} />} />
            ))}
        </group>
    )
}

// ─── Armchair ───────────────────────
function ArmchairModel({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            {/* Seat - wider */}
            <PBRMesh {...mp} position={[0, 0.3, 0]} geometry={<boxGeometry args={[0.8, 0.2, 0.7]} />} />
            {/* Back - curved via slight rotation */}
            <PBRMesh {...mp} position={[0, 0.6, -0.28]} rotation={[0.1, 0, 0]} geometry={<boxGeometry args={[0.8, 0.5, 0.12]} />} />
            {/* Left Arm */}
            <PBRMesh {...mp} position={[-0.38, 0.42, 0]} geometry={<boxGeometry args={[0.08, 0.24, 0.65]} />} />
            {/* Right Arm */}
            <PBRMesh {...mp} position={[0.38, 0.42, 0]} geometry={<boxGeometry args={[0.08, 0.24, 0.65]} />} />
            {/* Cushion */}
            <PBRMesh {...mp} position={[0, 0.42, 0.02]} geometry={<boxGeometry args={[0.65, 0.06, 0.55]} />} />
            {/* Legs */}
            {([[-0.32, 0.1, 0.28], [0.32, 0.1, 0.28], [-0.32, 0.1, -0.28], [0.32, 0.1, -0.28]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.025, 0.03, 0.2, 8]} />} />
            ))}
        </group>
    )
}

// ─── Chair ──────────────────────────
function Chair({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            <PBRMesh {...mp} position={[0, 0.4, 0]} geometry={<boxGeometry args={[0.5, 0.06, 0.5]} />} />
            <PBRMesh {...mp} position={[0, 0.72, -0.22]} geometry={<boxGeometry args={[0.5, 0.6, 0.05]} />} />
            {([[-0.2, 0.2, 0.2], [0.2, 0.2, 0.2], [-0.2, 0.2, -0.2], [0.2, 0.2, -0.2]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />} />
            ))}
        </group>
    )
}

// ─── Ottoman ────────────────────────
function OttomanModel({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            {/* Cushion top */}
            <PBRMesh {...mp} position={[0, 0.28, 0]} geometry={<boxGeometry args={[0.65, 0.12, 0.65]} />} />
            {/* Body */}
            <PBRMesh {...mp} position={[0, 0.16, 0]} geometry={<boxGeometry args={[0.62, 0.14, 0.62]} />} />
            {/* Short legs */}
            {([[-0.25, 0.04, 0.25], [0.25, 0.04, 0.25], [-0.25, 0.04, -0.25], [0.25, 0.04, -0.25]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />} />
            ))}
        </group>
    )
}

// ─── Table ──────────────────────────
function Table({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            <PBRMesh {...mp} position={[0, 0.7, 0]} geometry={<boxGeometry args={[1.2, 0.05, 0.7]} />} />
            {([[-0.5, 0.35, 0.28], [0.5, 0.35, 0.28], [-0.5, 0.35, -0.28], [0.5, 0.35, -0.28]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />} />
            ))}
        </group>
    )
}

// ─── Shelf ──────────────────────────
function ShelfModel({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            {/* Side panels */}
            <PBRMesh {...mp} position={[-0.5, 0.6, 0]} geometry={<boxGeometry args={[0.04, 1.2, 0.3]} />} />
            <PBRMesh {...mp} position={[0.5, 0.6, 0]} geometry={<boxGeometry args={[0.04, 1.2, 0.3]} />} />
            {/* 4 shelves */}
            {[0.05, 0.35, 0.65, 0.95].map((y, i) => (
                <PBRMesh key={i} {...mp} position={[0, y, 0]} geometry={<boxGeometry args={[1.0, 0.04, 0.3]} />} />
            ))}
            {/* Back panel */}
            <PBRMesh {...mp} position={[0, 0.6, -0.14]} geometry={<boxGeometry args={[1.0, 1.2, 0.02]} />} />
        </group>
    )
}

// ─── Cabinet ────────────────────────
function Cabinet({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            <PBRMesh {...mp} position={[0, 0.55, 0]} geometry={<boxGeometry args={[0.8, 1.0, 0.4]} />} />
            <AccentMesh position={[0, 0.55, 0.201]} geometry={<boxGeometry args={[0.01, 0.9, 0.01]} />} color="#000" />
            <AccentMesh position={[-0.08, 0.55, 0.22]} geometry={<boxGeometry args={[0.02, 0.12, 0.02]} />} color="#888" roughness={0.2} metalness={0.8} />
            <AccentMesh position={[0.08, 0.55, 0.22]} geometry={<boxGeometry args={[0.02, 0.12, 0.02]} />} color="#888" roughness={0.2} metalness={0.8} />
            {([[-0.35, 0.04, 0.15], [0.35, 0.04, 0.15], [-0.35, 0.04, -0.15], [0.35, 0.04, -0.15]] as [number, number, number][]).map((p, i) => (
                <AccentMesh key={i} position={p} geometry={<cylinderGeometry args={[0.025, 0.025, 0.08, 8]} />} />
            ))}
        </group>
    )
}

// ─── Lamp ───────────────────────────
function LampModel({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group>
            {/* Base */}
            <PBRMesh {...mp} position={[0, 0.03, 0]} geometry={<cylinderGeometry args={[0.18, 0.2, 0.06, 24]} />} />
            {/* Stem */}
            <AccentMesh position={[0, 0.45, 0]} geometry={<cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />} color="#666" roughness={0.3} metalness={0.7} />
            {/* Shade */}
            <PBRMesh {...mp} position={[0, 0.82, 0]} geometry={<cylinderGeometry args={[0.12, 0.25, 0.3, 24, 1, true]} />} />
            {/* Shade top cap */}
            <PBRMesh {...mp} position={[0, 0.97, 0]} geometry={<circleGeometry args={[0.12, 24]} />} castShadow={false} />
            {/* Light bulb glow (emissive sphere) */}
            <mesh position={[0, 0.78, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#fff8e0" emissive="#fff0b0" emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}

// ─── Rug ────────────────────────────
function RugModel({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group position={[0, 0.01, 0]}>
            {/* Main rug body */}
            <PBRMesh {...mp} rotation={[-Math.PI / 2, 0, 0]} geometry={<planeGeometry args={[2, 1.4]} />} />
            {/* Border frame (slightly darker) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
                <planeGeometry args={[2.06, 1.46]} />
                <meshStandardMaterial color={color} roughness={roughness + 0.1} metalness={metalness} />
            </mesh>
        </group>
    )
}

// ─── Wall ───────────────────────────
function Wall({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group position={[0, 1.25, -0.5]}>
            <PBRMesh {...mp} geometry={<boxGeometry args={[3, 2.5, 0.08]} />} />
        </group>
    )
}

// ─── Floor ──────────────────────────
function Floor({ pbr, color, roughness, metalness }: ObjProps) {
    const mp = { pbr, color, roughness, metalness }
    return (
        <group position={[0, 0.01, 0]}>
            <PBRMesh {...mp} rotation={[-Math.PI / 2, 0, 0]} geometry={<planeGeometry args={[3, 3]} />} />
        </group>
    )
}

// ─── Object Map ─────────────────────
const OBJECT_MAP: Record<string, React.ComponentType<ObjProps>> = {
    couch: Couch,
    armchair: ArmchairModel,
    chair: Chair,
    ottoman: OttomanModel,
    table: Table,
    shelf: ShelfModel,
    cabinet: Cabinet,
    lamp: LampModel,
    rug: RugModel,
    wall: Wall,
    floor: Floor,
}

const NO_ROTATE = ['wall', 'floor', 'rug']
const NO_SHADOW = ['wall', 'floor', 'rug']

// ─── Main Component ─────────────────
export function ActiveModel() {
    const { currentObject, currentCategory, currentMaterial, currentColor, isRotating } = useStore()
    const groupRef = useRef<THREE.Group>(null)

    const materialData = MATERIALS[currentCategory]?.find(m => m.id === currentMaterial)

    const pbr = useMemo(() => {
        if (!materialData || typeof window === 'undefined') return null
        return generatePBRTextures(materialData.textureType, materialData.color, materialData.id)
    }, [materialData])

    const tintedColor = useMemo(() => {
        if (!materialData) return new THREE.Color('#ffffff')
        return blendColorWithTint(materialData.color, currentColor)
    }, [materialData, currentColor])

    const matProps: ObjProps = {
        pbr,
        color: tintedColor,
        roughness: materialData?.roughness ?? 0.5,
        metalness: materialData?.metalness ?? 0,
    }

    useFrame(() => {
        if (groupRef.current && isRotating && !NO_ROTATE.includes(currentObject)) {
            groupRef.current.rotation.y += 0.002
        }
    })

    const ObjectComponent = OBJECT_MAP[currentObject] || Couch

    return (
        <group ref={groupRef}>
            <ObjectComponent {...matProps} />

            {!NO_SHADOW.includes(currentObject) && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
                    <circleGeometry args={[2.5, 64]} />
                    <meshStandardMaterial color="#000" opacity={0.12} transparent depthWrite={false} />
                </mesh>
            )}
        </group>
    )
}
