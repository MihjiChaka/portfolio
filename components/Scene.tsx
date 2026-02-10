
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useScroll, Float, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Stars from './Stars';

interface SceneProps {
  theme: 'dark' | 'light';
}

const Scene: React.FC<SceneProps> = ({ theme }) => {
  const scroll = useScroll();
  const { viewport, size } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const aspect = size.width / size.height;
  const isPortrait = aspect < 1;
  const isLargeDesktop = size.width > 2000;
  
  // Calculate responsive scale for the central mesh
  const baseScale = isPortrait ? 0.65 : isLargeDesktop ? 1.4 : 1.1;
  const responsiveScale = (viewport.width / 18) * baseScale;

  useFrame((state) => {
    const scrollOffset = scroll.offset; 
    
    if (cameraRef.current) {
      // Dynamic camera travel based on screen orientation
      const startZ = isPortrait ? 28 : 18;
      const targetZ = THREE.MathUtils.lerp(startZ, -135, scrollOffset);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);
      
      // Widen FOV on portrait to keep content visible
      const baseFov = isPortrait ? 85 : 60;
      cameraRef.current.fov = THREE.MathUtils.lerp(baseFov, 95, scrollOffset);
      cameraRef.current.updateProjectionMatrix();

      // Mouse influence
      const mouseFactor = isPortrait ? 0.1 : 0.25;
      const mouseX = (state.mouse.x * state.viewport.width) / 20;
      const mouseY = (state.mouse.y * state.viewport.height) / 20;
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouseX * mouseFactor, 0.03);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, mouseY * mouseFactor, 0.03);
      
      cameraRef.current.lookAt(0, 0, cameraRef.current.position.z - 45);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
      
      const s = responsiveScale * (1 + scrollOffset * 0.45);
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <color attach="background" args={[isDark ? '#020202' : '#f5f5f7']} />
      
      <PerspectiveCamera 
        ref={cameraRef}
        makeDefault 
        position={[0, 0, 18]} 
        fov={65}
      />

      <group>
        <Stars count={isDark ? 6000 : 1500} color={isDark ? "#ffffff" : "#3b82f6"} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={isPortrait ? 50 : 120} 
          sectionColor={isDark ? "#1a1a1a" : "#cbd5e1"} 
          cellColor={isDark ? "#0a0a0a" : "#e2e8f0"} 
          sectionSize={15}
          cellSize={5}
          position={[0, -15, 0]}
        />

        <ambientLight intensity={isDark ? 0.15 : 0.6} />
        <spotLight position={[30, 40, 20]} angle={0.3} penumbra={1} intensity={isDark ? 4 : 1.5} color="#3b82f6" />
        <pointLight position={[-30, -20, -20]} intensity={isDark ? 3 : 1} color={isDark ? "#ec4899" : "#3b82f6"} />

        {/* Central Geometric Icon */}
        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
          <mesh ref={meshRef} position={[0, 0, -10]}>
            <icosahedronGeometry args={[6, 4]} />
            <meshStandardMaterial 
              color={isDark ? "#050505" : "#ffffff"} 
              emissive={isDark ? "#1e40af" : "#ffffff"} 
              emissiveIntensity={isDark ? 1.2 : 0.1}
              wireframe 
              transparent 
              opacity={isDark ? 0.6 : 0.8}
            />
          </mesh>
        </Float>

        {/* Dynamic Nodes */}
        {[...Array(isPortrait ? 8 : 18)].map((_, i) => (
          <Float key={i} speed={0.4 + Math.random()} rotationIntensity={2} floatIntensity={1.5}>
            <mesh 
              position={[
                (Math.random() - 0.5) * (isPortrait ? 30 : 80),
                (Math.random() - 0.5) * (isPortrait ? 40 : 80),
                -i * 25 - 40
              ]}
              scale={responsiveScale * 0.35}
            >
              <dodecahedronGeometry args={[2, 0]} />
              <meshStandardMaterial 
                color={isDark ? (i % 2 === 0 ? "#3b82f6" : "#ec4899") : "#64748b"} 
                wireframe 
                transparent
                opacity={isDark ? 0.15 : 0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <EffectComposer multisampling={isLargeDesktop ? 8 : 4}>
        <Bloom 
          luminanceThreshold={isDark ? 0.1 : 0.9} 
          mipmapBlur 
          intensity={isDark ? 1.4 : 0.3} 
          radius={0.6}
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.001, 0.001)} 
        />
        <Noise opacity={isDark ? 0.12 : 0.05} />
        <Vignette eskil={false} offset={0.2} darkness={isDark ? 1.2 : 0.6} />
      </EffectComposer>
    </>
  );
};

export default Scene;
