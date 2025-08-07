import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { state, stepCompleted } from '../stores/player';
import { tileSize } from '../constants';

export default function usePlayerAnimation(ref: React.RefObject<THREE.Group | null>) {
  const moveClock = new THREE.Clock(false);
  const blinkClock = new THREE.Clock(true);

  useFrame(() => {
    if (!ref.current) return;
    const player = ref.current;

    const eyes = player.children[0].children[1] as THREE.Mesh;
    if (eyes) {
      const blinkInterval = 3;
      const blinkDuration = 0.2;
      const elapsedTime = blinkClock.getElapsedTime();

      if (elapsedTime % blinkInterval < blinkDuration) {
        const blinkProgress = Math.abs(Math.sin((elapsedTime % blinkDuration) * Math.PI * (1 / blinkDuration)));
        eyes.scale.set(1, 1, 1 - 1 * blinkProgress); // Shrink vertically
      } else {
        eyes.scale.set(1, 1, 1);
      }
    }

    if (!state.movesQueue.length) return;
    if (!moveClock.running) moveClock.start();

    const stepTime = 0.2;
    const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

    setPosition(player, progress);
    setRotation(player, progress);

    if (progress >= 1) {
      stepCompleted();
      moveClock.stop();
    }
  });
}

function setPosition(player: THREE.Group, progress: number) {
  const startX = state.currentTile * tileSize;
  const startY = state.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (state.movesQueue[0] === 'left') endX -= tileSize;
  if (state.movesQueue[0] === 'right') endX += tileSize;
  if (state.movesQueue[0] === 'forward') endY += tileSize;
  if (state.movesQueue[0] === 'backward') endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
  player.children[0].children[5].rotation.x = Math.sin(progress * Math.PI) * 2 + -Math.PI / 4;
}

function setRotation(player: THREE.Group, progress: number) {
  let endRotation = 0;

  if (state.movesQueue[0] === 'forward') endRotation = 0;
  if (state.movesQueue[0] === 'left') endRotation = Math.PI / 2;
  if (state.movesQueue[0] === 'right') endRotation = -Math.PI / 2;
  if (state.movesQueue[0] === 'backward') endRotation = Math.PI;

  player.children[0].rotation.z = THREE.MathUtils.lerp(player.children[0].rotation.z, endRotation, progress);
}
