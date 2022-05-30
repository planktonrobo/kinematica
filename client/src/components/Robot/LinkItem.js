import Joint from "./Joint";
import { useRef } from "react";
import useAngles from "../../hooks/useAngles";
import useAngleFrame from "../../hooks/useAngleFrame";

export const LinkItem = ({ children, link, joint }) => {

  let angles = useAngles();
  const ref = useRef();
  useAngleFrame(ref, joint.jointNumber, angles);

  return (
    <group position={link.groupPositon} rotation={link.groupRotation} ref={ref}>
      <mesh position={link.boxPosition}>
        <boxGeometry attach="geometry" args={link.boxGeometry} />
        <meshBasicMaterial />
      </mesh>
      <Joint joint={joint} />
      {children}
    </group>
  );
};
