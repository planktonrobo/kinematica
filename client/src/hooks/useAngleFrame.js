import { useFrame } from "@react-three/fiber";

export default function useAngleFrame(ref, jointNumber, angles) {
  useFrame((state) => {
    if (angles && angles?.length > 0) {
      if (jointNumber === 0 || jointNumber === 5) {
        ref.current.rotation.z = angles[jointNumber];
      }
      if (jointNumber === 1 || jointNumber === 2 || jointNumber === 4) {
        ref.current.rotation.y = angles[jointNumber];
      }
      if (jointNumber === 3) {
        ref.current.rotation.x = angles[jointNumber];
      }
    }
  });
}
