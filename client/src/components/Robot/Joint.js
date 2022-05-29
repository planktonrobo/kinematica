import React from "react";

const Joint = ({ joint }) => {
  return (
    <group rotation={joint.rotation}>
      <mesh>
        <cylinderGeometry attach="geometry" args={joint.geo.shape} />
        <meshBasicMaterial color={joint.geo.color} />
      </mesh>
      <mesh>
        <cylinderGeometry attach="geometry" args={joint.min.shape} />
        <meshBasicMaterial color={joint.min.color} />
      </mesh>
      <mesh>
        <cylinderGeometry attach="geometry" args={joint.max.shape} />
        <meshBasicMaterial color={joint.max.color} />
      </mesh>
    </group>
  );
};

export default Joint;
