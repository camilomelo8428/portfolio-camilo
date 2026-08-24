"use client";

import { useRef, type MutableRefObject } from "react";
import { ContactShadows, Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

type DeveloperCharacterProps = {
  mouse: MutableRefObject<{ x: number; y: number }>;
};

/**
 * Personagem low-poly sentado; cabeca segue o mouse suavemente.
 */
function DeveloperCharacter({ mouse }: DeveloperCharacterProps) {
  const rootRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const root = rootRef.current;
    const head = headRef.current;
    if (!root || !head) {
      return;
    }

    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      mouse.current.x * 0.18,
      delta * 2.4,
    );
    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      mouse.current.y * -0.06,
      delta * 2.4,
    );

    head.rotation.y = THREE.MathUtils.lerp(
      head.rotation.y,
      mouse.current.x * 0.42,
      delta * 3.2,
    );
    head.rotation.x = THREE.MathUtils.lerp(
      head.rotation.x,
      mouse.current.y * -0.28,
      delta * 3.2,
    );
  });

  const skin = "#e8b992";
  const shirt = "#141820";
  const jeans = "#2f4f73";
  const hair = "#1f1410";
  const beard = "#2a1812";

  return (
    <group ref={rootRef} position={[0, -0.05, 0.15]}>
      <mesh position={[0, -0.55, 0.25]} castShadow>
        <boxGeometry args={[0.72, 0.16, 0.62]} />
        <meshStandardMaterial color={jeans} roughness={0.85} />
      </mesh>

      <mesh position={[0, -0.15, 0.08]} castShadow>
        <boxGeometry args={[0.78, 0.72, 0.42]} />
        <meshStandardMaterial color={shirt} roughness={0.72} />
      </mesh>

      <group position={[-0.46, -0.02, 0.28]} rotation={[0.25, 0.12, 0.08]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.52, 0.18]} />
          <meshStandardMaterial color={skin} roughness={0.65} />
        </mesh>
      </group>

      <group position={[0.46, -0.02, 0.28]} rotation={[0.35, -0.08, -0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.52, 0.18]} />
          <meshStandardMaterial color={skin} roughness={0.65} />
        </mesh>
      </group>

      <group ref={headRef} position={[0, 0.48, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.38, 0.34]} />
          <meshStandardMaterial color={skin} roughness={0.58} />
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.36, 0.2, 0.36]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.06, 0.12]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.12]} />
          <meshStandardMaterial color={beard} roughness={0.88} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Mesa, monitor e cadeira do cenario 3D.
 */
function Workspace() {
  return (
    <group position={[0, -0.85, -0.05]}>
      <mesh position={[0, 0.42, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.08, 0.72]} />
        <meshStandardMaterial color="#4a3220" roughness={0.78} />
      </mesh>

      <mesh position={[-0.52, 0.22, -0.05]} castShadow>
        <boxGeometry args={[0.08, 0.48, 0.08]} />
        <meshStandardMaterial color="#111820" metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[0.52, 0.22, -0.05]} castShadow>
        <boxGeometry args={[0.08, 0.48, 0.08]} />
        <meshStandardMaterial color="#111820" metalness={0.35} roughness={0.4} />
      </mesh>

      <group position={[0, 0.78, -0.22]}>
        <mesh castShadow>
          <boxGeometry args={[0.92, 0.56, 0.06]} />
          <meshStandardMaterial color="#0c1018" roughness={0.35} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.82, 0.46]} />
          <meshStandardMaterial
            color="#081018"
            emissive="#4eb3cf"
            emissiveIntensity={0.55}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, 0.08, 0.05]}
          fontSize={0.045}
          color="#7ec8dc"
          anchorX="left"
          anchorY="top"
        >
          {"const dev = true;"}
        </Text>
        <Text
          position={[0, 0.02, 0.05]}
          fontSize={0.04}
          color="#e8894a"
          anchorX="left"
          anchorY="top"
        >
          {"build(prod)"}
        </Text>
      </group>

      <mesh position={[0.42, 0.47, 0.12]} castShadow>
        <boxGeometry args={[0.42, 0.04, 0.16]} />
        <meshStandardMaterial
          color="#101820"
          emissive="#4eb3cf"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[0.58, 0.5, 0.05]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      <mesh position={[0.62, 0.52, 0.18]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.12, 12]} />
        <meshStandardMaterial color="#2d6b3a" roughness={0.8} />
      </mesh>

      <group position={[0, 0.05, 0.35]}>
        <mesh position={[0, 0.35, -0.05]} castShadow>
          <boxGeometry args={[0.62, 0.72, 0.08]} />
          <meshStandardMaterial color="#101820" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.02, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.08, 0.58]} />
          <meshStandardMaterial color="#0a0e14" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
}

type DeveloperSceneProps = {
  mouse: MutableRefObject<{ x: number; y: number }>;
};

/**
 * Cena 3D completa do desenvolvedor na mesa.
 */
export function DeveloperScene({ mouse }: DeveloperSceneProps) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        intensity={1.15}
        position={[2.5, 4, 2]}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#4eb3cf" intensity={0.8} position={[-1.2, 1.5, 1.2]} />
      <pointLight color="#e8894a" intensity={0.35} position={[1.5, 0.8, -0.5]} />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
        <group>
          <Workspace />
          <DeveloperCharacter mouse={mouse} />
        </group>
      </Float>

      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.55}
        scale={8}
        blur={2.4}
        far={4}
      />
    </>
  );
}
