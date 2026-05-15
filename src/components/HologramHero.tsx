import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
// @ts-ignore
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
// @ts-ignore
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
// @ts-ignore
      meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
// @ts-ignore
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="#D4AF37"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

export default function HologramHero() {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#D4AF37" intensity={1} />
        <AnimatedSphere />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-gold mb-6 block drop-shadow-[0_0_10px_#D4AF37]">Neural Gastronomy</span>
          <h1 className="serif-title text-7xl md:text-9xl italic mb-6 leading-none text-paper relative">
             {t('hero.title')}
             <motion.div 
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute -inset-4 bg-gold/5 blur-3xl -z-10 rounded-full"
             />
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/40 max-w-lg mx-auto leading-loose">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
