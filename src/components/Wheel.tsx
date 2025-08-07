export function Wheel({ x }: { x: number }) {
  return (
    <mesh position={[x, 0, 6]} castShadow receiveShadow>
      <boxGeometry args={[12, 33, 12]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
  );
}
