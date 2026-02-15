'use client'

import { useStore } from "@/store/useStore"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MATERIALS } from "@/lib/data"
// import { useTexture } from "@react-three/drei"

export function ActiveModel() {
    const { currentObject, currentCategory, currentMaterial, currentColor } = useStore()
    const meshRef = useRef<THREE.Mesh>(null)

    // Material Data Lookup
    const materialData = MATERIALS[currentCategory]?.find(m => m.id === currentMaterial)

    // Note: In a real app with assets, we would use useTexture here:
    // const texture = useTexture(materialData?.texture || '/placeholder.png')

    useFrame((state, delta) => {
        // Gentle rotation for presentation
        if (meshRef.current) {
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                meshRef.current.rotation.y + 0.05,
                0.01
            )
        }
    })

    // Geometry Selection (Placeholder logic)
    const getGeometry = () => {
        switch (currentObject) {
            case 'chair': return <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
            case 'table': return <cylinderGeometry args={[1, 1, 0.05, 32]} />
            case 'cabinet': return <boxGeometry args={[1, 1.8, 0.6]} />
            case 'couch':
            default: return <boxGeometry args={[1.8, 0.6, 0.8]} />
        }
    }

    // Update material properties when state changes
    useEffect(() => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.MeshStandardMaterial

            // 1. Color Tint (Using the hex from store + material base color if any)
            // For Lite MVP, we just overwrite with the selected color or material color
            const targetColor = currentColor !== '#ffffff'
                ? currentColor
                : (materialData?.color || '#ffffff')

            mat.color.set(targetColor)

            // 2. Texture parameters (simulated)
            if (currentCategory === 'metal') {
                mat.roughness = 0.2
                mat.metalness = 0.8
            } else if (currentCategory === 'fabric') {
                mat.roughness = 0.9
                mat.metalness = 0
            } else if (currentCategory === 'wood') {
                mat.roughness = 0.6
                mat.metalness = 0
            } else if (currentCategory === 'tile') {
                mat.roughness = 0.1
                mat.metalness = 0
            } else {
                mat.roughness = 0.5
                mat.metalness = 0
            }

            mat.needsUpdate = true
        }
    }, [currentCategory, currentMaterial, currentColor, materialData])

    return (
        <group position={[0, 0, 0]}>
            <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.5, 0]}>
                {getGeometry()}
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.5}
                    metalness={0}
                />
            </mesh>

            {/* Floor Shadow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                <circleGeometry args={[2, 32]} />
                <meshStandardMaterial color="#000000" opacity={0.2} transparent />
            </mesh>
        </group>
    )
}
