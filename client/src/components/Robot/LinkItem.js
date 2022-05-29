import Joint from "./Joint";
import { useRef } from "react";
import useAngles from "../../hooks/useAngles";
// import { useFrame } from "@react-three/fiber";
export const LinkItem = ({ children, link, joint }) => {
  const ref = useRef();
  useAngles(ref, joint.jointNumber);

  return (
    <group position={link.groupPositon} rotation={link.groupRotation} ref={ref}>
      <mesh position={link.boxPosition}>
        <boxGeometry attach="geometry" args={link.boxGeometry} />
        <meshBasicMaterial color="orange" />
      </mesh>
      <Joint joint={joint} />
      {children}
    </group>
  );
};
