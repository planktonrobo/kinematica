import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { defaultRobotState, geo } from "../../iniitalRobot";
import { createDataTree } from "../../helpers/createRobot";
import { RecursiveLinkTree } from "./RecursiveLinkTree";
const Robot = () => {
  let V_Initial = Object.values(defaultRobotState.geometry).map((v) => [
    v.x,
    v.y,
    v.z,
  ]);

  let limits = Object.values(defaultRobotState.jointLimits);

  V_Initial.push([0, 0, 0]); // add a 6th pseudo link for 6 axis

  let listMeta = useMemo(() => createDataTree(V_Initial, limits));

  const ref = useRef();

  const { viewport, camera } = useThree();
  // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0]);
  // useFrame(() => {
  //   ref.current.scale = viewport / 5;
  // });

  return (
    <group
      ref={ref}
      position={[0, -1, 0]}
      scale={.1}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <RecursiveLinkTree listMeta={listMeta} />
    </group>
  );
};

export default Robot;
