'use client'

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { ActiveModel } from "./ActiveModel"

export function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 1.5, 4], fov: 35 }}
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full bg-gray-50"
        >
            <Suspense fallback={null}>
                <Environment preset="studio" />
                <OrbitControls
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.8}
                    enableZoom={true} // Allow zoom for detail
                />

                {/* Dynamic Content */}
                <ActiveModel />
            </Suspense>
        </Canvas>
    )
}
