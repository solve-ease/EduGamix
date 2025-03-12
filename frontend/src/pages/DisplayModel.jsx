
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Scene from '../components/AvatarModel'

export default function DisplayModel() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  )
}
