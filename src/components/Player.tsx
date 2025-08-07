import * as THREE from 'three';
import { Bounds } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import usePlayerAnimation from '../hooks/usePlayerAnimation';
import { DirectionalLight } from './DirectionalLight';
import { setRef } from '../stores/player';

export function Player() {
  const player = useRef<THREE.Group | null>(null);
  const camera = useThree(state => state.camera);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current) return;
    if (!lightRef.current) return;

    player.current.add(camera);
    lightRef.current.target = player.current;

    setRef(player.current);
  });

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={player}>
        <group>
          {/* Head */}
          <mesh position={[0, 0, 18]} castShadow receiveShadow>
            <boxGeometry args={[5, 6, 4]} />
            <meshLambertMaterial color={0x000000} flatShading />
          </mesh>
          {/* Eyes */}
          <mesh position={[0, 1, 18]} castShadow receiveShadow>
            <boxGeometry args={[6, 1, 2]} />
            <meshLambertMaterial color={0xffffff} flatShading />
          </mesh>
          {/* Body */}
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[8, 8, 12]} />
            <meshLambertMaterial color={0x000000} flatShading />
          </mesh>
          {/* Wings */}
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[9, 6, 10]} />
            <meshLambertMaterial color={0x443344} flatShading />
          </mesh>
          {/* Beak */}
          <mesh position={[0, 4, 17]} castShadow receiveShadow>
            <boxGeometry args={[2, 6, 3]} />
            <meshLambertMaterial color={0x666666} flatShading />
          </mesh>
          {/* Tail */}
          <mesh position={[0, -5, 10]} rotation={[-Math.PI / 4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[5, 4, 2]} />
            <meshLambertMaterial color={0x443344} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={lightRef} />
      </group>
    </Bounds>
  );
}
