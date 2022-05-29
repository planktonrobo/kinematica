import { useFrame } from "@react-three/fiber";

export default function useAngles(ref, jointNumber) {
    
  let angles = [0, 0, 0, 0, 0, 0];
  useFrame((state) => {
    if (jointNumber === 0) {
      ref.current.rotation.z = angles[jointNumber];
    }
    if (jointNumber === 1) {
      ref.current.rotation.y = angles[jointNumber];
    }
    if (jointNumber === 2) {
      ref.current.rotation.y = angles[jointNumber];
    }
    if (jointNumber === 3) {
      ref.current.rotation.x = angles[jointNumber];
    }
    if (jointNumber === 4) {
      ref.current.rotation.y = angles[jointNumber];
    }
    if (jointNumber === 5) {
      ref.current.rotation.z = angles[jointNumber];
    }
  });
}
