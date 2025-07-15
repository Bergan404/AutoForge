import { Canvas,  useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect } from 'react'

function DebugCamera() {
  const { camera } = useThree()

  useEffect(() => {
    console.log('Camera position:', camera.position)
  })

  return null
}

function CarModel({ color }) {
  const { scene, materials } = useGLTF('/models/ford_bronco.glb')

  // Change the material color directly
  if (materials.Carbonized_Grey) {
    materials.Carbonized_Grey.color.set(color)
  }

  return <primitive object={scene} scale={1.5} />
}

export default function CarCanvas({ color }) {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [10, 20, 6], fov: 50 }}>
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