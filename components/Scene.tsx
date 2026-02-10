
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
  const { viewport } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const isMobile = viewport.width < 10;
  
  // Calculate dynamic scale based on viewport width
  const responsiveScale = Math.min(Math.max(viewport.width / 15, 0.5), 1.2);

  useFrame((state) => {
    const scrollOffset = scroll.offset; 
    
    if (cameraRef.current) {
      // Adjusted lerp for ultra-smooth travel, travel further on mobile to compensate for width
      const targetZ = THREE.MathUtils.lerp(isMobile ? 22 : 18, -120, scrollOffset);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);
      
      cameraRef.current.fov = THREE.MathUtils.lerp(isMobile ? 75 : 65, 95, scrollOffset);
      cameraRef.current.updateProjectionMatrix();

      const mouseX = (state.mouse.x * state.viewport.width) / 20;
      const mouseY = (state.mouse.y * state.viewport.height) / 20;
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, mouseX * 0.3, 0.03);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, mouseY * 0.3, 0.03);
      cameraRef.current.lookAt(0, 0, cameraRef.current.position.z - 30);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
      // Gently scale with scroll
      const s = responsiveScale * (1 + scrollOffset * 0.5);
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
        <Stars count={isDark ? 5000 : 1000} color={isDark ? "#ffffff" : "#4488ff"} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={isMobile ? 50 : 80} 
          sectionColor={isDark ? "#222" : "#ccc"} 
          cellColor={isDark ? "#111" : "#eee"} 
          sectionSize={10}
          cellSize={2}
          position={[0, -10, 0]}
        />

        <ambientLight intensity={isDark ? 0.15 : 0.5} />
        <spotLight position={[20, 20, 10]} angle={0.2} penumbra={1} intensity={isDark ? 3 : 1} color="#4488ff" />
        <pointLight position={[-20, -10, -20]} intensity={isDark ? 2 : 0.5} color={isDark ? "#ff4488" : "#4488ff"} />

        {/* Central Geometric Icon */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={meshRef} position={[0, 0, -10]}>
            <icosahedronGeometry args={[6, 3]} />
            <meshStandardMaterial 
              color={isDark ? "#050505" : "#ffffff"} 
              emissive={isDark ? "#111111" : "#ffffff"} 
              emissiveIntensity={isDark ? 1 : 0.1}
              wireframe 
              transparent 
              opacity={isDark ? 0.4 : 0.6}
            />
          </mesh>
        </Float>

        {/* Dynamic Nodes */}
        {[...Array(isMobile ? 8 : 12)].map((_, i) => (
          <Float key={i} speed={0.5 + Math.random()} rotationIntensity={2} floatIntensity={1}>
            <mesh 
              position={[
                (Math.random() - 0.5) * (isMobile ? 30 : 50),
                (Math.random() - 0.5) * (isMobile ? 30 : 50),
                -i * 25 - 20
              ]}
              scale={responsiveScale}
            >
              <dodecahedronGeometry args={[1.5, 0]} />
              <meshStandardMaterial 
                color={isDark ? (i % 2 === 0 ? "#4488ff" : "#ff4488") : "#222"} 
                wireframe 
                transparent
                opacity={isDark ? 0.15 : 0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <EffectComposer multisampling={8}>
        <Bloom 
          luminanceThreshold={isDark ? 0.05 : 0.8} 
          mipmapBlur 
          intensity={isDark ? 1.0 : 0.3} 
          radius={0.4}
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.0006, 0.0006)} 
        />
        <Noise opacity={isDark ? 0.08 : 0.03} />
        <Vignette eskil={false} offset={0.1} darkness={isDark ? 1.05 : 0.6} />
      </EffectComposer>
    </>
  );
};

export default Scene;
