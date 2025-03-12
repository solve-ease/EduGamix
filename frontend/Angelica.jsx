/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 models/angelica.glb --debug 
Author: NikZava284 ✓ (https://sketchfab.com/NikZava284)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/angelica-27f75fa94c384000bb6a79a3000f8e80
Title: Angelica
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/angelica.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.138}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Mouth_Mouth_0.geometry} material={materials.Mouth} position={[-15.645, 2716.738, 965.354]} scale={89.082} />
          <mesh geometry={nodes.Hair_Hair_0.geometry} material={materials.Hair} position={[-15.645, 2716.738, 965.354]} scale={89.082} />
          <mesh geometry={nodes.Head_Head_0.geometry} material={materials.Head} scale={100} />
          <mesh geometry={nodes.Eye_Eye_0.geometry} material={materials.material} position={[-489.565, -152.338, -100.174]} scale={105.701} />
          <mesh geometry={nodes.EyeScleraReflect_EyeScleraReflect_0.geometry} material={materials.EyeScleraReflect} position={[-489.565, -152.338, -100.174]} scale={105.701} />
          <mesh geometry={nodes.Eyelashes_Eyelashes_0.geometry} material={materials.Eyelashes} position={[-7.305, -3176.431, 852.947]} scale={2642.16} />
          <mesh geometry={nodes.MeniscusEyeSpec_MeniscusEye_0.geometry} material={materials.MeniscusEye} scale={100} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/angelica.glb')
