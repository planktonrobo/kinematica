import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
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

  const [messages, setMessages] = useState({});


  useFrame((state) => {
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <group ref={ref} position={[0, 0, -45]} rotation={[-1, 0, 0]}>
      <RecursiveLinkTree listMeta={listMeta} />
    </group>
  );
};

export default Robot;
