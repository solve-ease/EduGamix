// import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// // This component handles the 3D avatar model and its animations
// // const AvatarModel = forwardRef(({ mood = 'neutral', isSpeaking = false, position = [0, 0, 0] }, ref) => {
// //   const groupRef = useRef();
// //   const meshRef = useRef();
// //   const previousMoodRef = useRef(mood);
  
// //   // Load the 3D model and its animations
// //   // Note: You would need to provide an actual model path here
// //   const { scene, animations } = useGLTF('/home/kalie/work/projects/EduGamix/frontend/models/angelica.glb');
// //   const { actions, names } = useAnimations(animations, groupRef);
  
// //   // Animation state
// //   const animationState = useRef({
// //     speaking: false,
// //     blinking: false,
// //     lastBlink: 0,
// //     nextBlinkIn: Math.random() * 3 + 2, // Random time for natural blinking
// //   });
  
// //   // Expose methods to parent component
// //   useImperativeHandle(ref, () => ({
// //     startTalking: () => {
// //       animationState.current.speaking = true;
// //       if (actions.talking) actions.talking.play();
// //     },
// //     stopTalking: () => {
// //       animationState.current.speaking = false;
// //       if (actions.talking) actions.talking.stop();
// //       if (actions.idle) actions.idle.play();
// //     },
// //     playAnimation: (animationName) => {
// //       if (actions[animationName]) {
// //         Object.values(actions).forEach(action => action.stop());
// //         actions[animationName].play();
// //       }
// //     }
// //   }));
  
// //   // Handle mood changes
// //   useEffect(() => {
// //     if (mood !== previousMoodRef.current) {
// //       // Play appropriate animation based on mood
// //       switch (mood) {
// //         case 'happy':
// //           if (actions.happy) actions.happy.play();
// //           break;
// //         case 'disappointed':
// //           if (actions.disappointed) actions.disappointed.play();
// //           break;
// //         case 'neutral':
// //         default:
// //           if (actions.idle) actions.idle.play();
// //           break;
// //       }
      
// //       // Reset to idle animation after playing mood animation
// //       const timer = setTimeout(() => {
// //         if (actions.idle && !animationState.current.speaking) {
// //           actions.idle.play();
// //         }
// //       }, 2000);
      
// //       previousMoodRef.current = mood;
// //       return () => clearTimeout(timer);
// //     }
// //   }, [mood, actions]);
  
// //   // Initialize animations
// //   useEffect(() => {
// //     if (actions.idle) {
// //       actions.idle.play();
// //     }
    
// //     // Create a material that can be morphed for facial expressions
// //     if (scene && scene.traverse) {
// //       scene.traverse((object) => {
// //         if (object.isMesh) {
// //           // Enhanced material settings for better visual quality
// //           object.material = new THREE.MeshPhysicalMaterial({
// //             map: object.material.map,
// //             normalMap: object.material.normalMap,
// //             roughness: 0.8,
// //             metalness: 0.1,
// //             clearcoat: 0.1,
// //             clearcoatRoughness: 0.2,
// //           });
          
// //           // Set up morphing if the mesh supports it
// //           if (object.morphTargetDictionary && object.morphTargetInfluences) {
// //             meshRef.current = object;
// //           }
// //         }
// //       });
// //     }
    
// //     return () => {
// //       // Cleanup animations
// //       Object.values(actions).forEach(action => action.stop());
// //     };
// //   }, [scene, actions]);
  
// //   // Animation loop for more natural movements
// //   useFrame((_, delta) => {
// //     // Natural head movement
// //     if (groupRef.current) {
// //       // Subtle swaying motion
// //       groupRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;
      
// //       // Subtle breathing motion
// //       groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0015) * 0.02;
// //     }
    
// //     // Blinking logic
// //     if (meshRef.current && meshRef.current.morphTargetDictionary) {
// //       const blinkIndex = meshRef.current.morphTargetDictionary['blink'];
      
// //       if (blinkIndex !== undefined) {
// //         const now = Date.now() * 0.001;
        
// //         // Time to blink?
// //         if (!animationState.current.blinking && 
// //             now - animationState.current.lastBlink > animationState.current.nextBlinkIn) {
// //           animationState.current.blinking = true;
// //         }
        
// //         // Blink animation
// //         if (animationState.current.blinking) {
// //           // Blink speed - faster closing, slower opening
// //           const blinkSpeed = 4;
// //           const blinkValue = meshRef.current.morphTargetInfluences[blinkIndex];
          
// //           if (blinkValue < 1) {
// //             // Closing eyes
// //             meshRef.current.morphTargetInfluences[blinkIndex] += delta * blinkSpeed;
// //           } else {
// //             // Opening eyes
// //             meshRef.current.morphTargetInfluences[blinkIndex] -= delta * (blinkSpeed * 0.5);
            
// //             // Finished blinking
// //             if (meshRef.current.morphTargetInfluences[blinkIndex] <= 0) {
// //               meshRef.current.morphTargetInfluences[blinkIndex] = 0;
// //               animationState.current.blinking = false;
// //               animationState.current.lastBlink = now;
// //               animationState.current.nextBlinkIn = Math.random() * 3 + 2; // 2-5 seconds
// //             }
// //           }
// //         }
// //       }
      
// //       // Talking animation for mouth movement
// //       const mouthOpenIndex = meshRef.current.morphTargetDictionary['mouthOpen'];
      
// //       if (mouthOpenIndex !== undefined && isSpeaking) {
// //         // Simulate talking by varying mouth openness
// //         meshRef.current.morphTargetInfluences[mouthOpenIndex] = 
// //           0.2 + Math.sin(Date.now() * 0.01) * 0.2;
// //       } else if (mouthOpenIndex !== undefined) {
// //         // Return to closed mouth when not speaking
// //         meshRef.current.morphTargetInfluences[mouthOpenIndex] = 0;
// //       }
// //     }
// //   });
  
// //   return (
// //     <group ref={groupRef} position={position} dispose={null}>
// //       <primitive object={scene} scale={1.75} />
// //     </group>
// //   );
// // });

// // // Preload the model
// // useGLTF.preload('/home/kalie/work/projects/EduGamix/frontend/models/angelica.glb');

// const AvatarModel = ()=>{
//   const loader = new GLTFLoader();

// loader.load( '/home/kalie/work/projects/EduGamix/frontend/models/angelica.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );
// }

// export default AvatarModel;

// components/AngelicaModel.jsx
// import { useGLTF, useAnimations } from '@react-three/drei'
// import { useGraph } from '@react-three/fiber'
// import { useEffect } from 'react'
// import * as THREE from 'three'

// function AngelicaModel(props) {
//   const { scene, materials, animations } = useGLTF('frontend/models/angelica.glb')
//   const { nodes } = useGraph(scene)
//   const { actions } = useAnimations(animations, scene)

//   // Fix material warnings
//   useEffect(() => {
//     Object.values(materials).forEach((material) => {
//       if (material instanceof THREE.MeshStandardMaterial) {
//         material.metalness = 0.2
//         material.roughness = 0.8
//         delete material.glossiness
//         delete material.specular
//       }
//     })
//   }, [materials])

//   return (
//     <group {...props} dispose={null}>
//       <group name="Scene">
//         <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
//           <primitive object={nodes.mixamorigHips} />
//           <skinnedMesh
//             name="Angelica"
//             geometry={nodes.Angelica.geometry}
//             material={materials.Skin}
//             skeleton={nodes.Angelica.skeleton}
//           />
//         </group>
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('frontend/models/angelica.glb')

// export default AngelicaModel


import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const AngelicaModel = () => {
  const { scene } = useGLTF("/home/kalie/work/projects/EduGamix/frontend/models/angelica.glb");

  return <primitive object={scene} scale={1.5} />;
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Suspense fallback={null}>
        <AngelicaModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
