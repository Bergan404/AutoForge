import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { useControls } from 'leva'

function DebugCamera() {
    const { camera } = useThree()

    useEffect(() => {
        console.log('Camera position:', camera.position)
    })

    return null
}

function CarModel({ color }) {
    const { positionY, positionX, positionZ, scale, offsetX, offsetY  } = useControls('Model Controls', {
        positionY: { value: 11, min: -5, max: 100, step: 0.1 },
        positionX: { value: 27, min: -5, max: 100, step: 0.1 },
        positionZ: { value: 77, min: -5, max: 100, step: 0.1 },
        offsetX: { value: 2.0, min: -5, max: 5, step: 0.1 },
        offsetY: { value: -0.2, min: -5, max: 5, step: 0.1 },
        scale: { value: 3.1, min: 0.1, max: 10, step: 0.1 },
        fov: 50
    })

    const { scene, materials } = useGLTF('/models/ford_bronco.glb')

    if (materials.Carbonized_Grey) {
        materials.Carbonized_Grey.color.set(color)
        materials.Carbonized_Grey.metalness = 0.6    // 0 to 1 (higher = more metallic)
        materials.Carbonized_Grey.roughness = 0    // 0 = very glossy, 1 = matte
        materials.Carbonized_Grey.envMapIntensity = 2.5 // boost reflections
    }

    return (
        <group position={[positionX, positionY, positionZ]}>
            <primitive object={scene} scale={scale} position={[-offsetX, offsetY, 0]} />
        </group>
    )
}

export default function CarCanvas({ color }) {
    return (
        <div style={{ width: '100%', height: '600px' }}>
            <Canvas camera={{ fov: 10 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <Suspense fallback={null}>
                    <CarModel color={color} />
                </Suspense>
                <OrbitControls />
                <DebugCamera />
            </Canvas>
        </div>
    )
}