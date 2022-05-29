import { useState, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Box() {
  const [clicked, setClicked] = useState(false);
  const ref = useRef();
  const { viewport } = useThree();

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), //spread of -3 to 3, no wait the responsive viewport width
    y: 1,
  });

  useFrame(() => {
    ref.current.position.set(viewport.width * data.x, (data.y += 0.1), 0);
    if (data.y > viewport.height) {
      data.y = -viewport.height;
    }
  });
  return (
    <mesh ref={ref} onClick={() => setClicked(!clicked)}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}

export default Box

// Basic movements

// Math sin functions returns -1 to 1 range

// move back and forth based on continuously elapsing time

// ref.current.rotation.x = Math.sin(state.clock.elapsedTime)

// change range

//  ref.current.position.y = Math.sin(state.clock.elapsedTime) * 2

// slow down movement

// Math.sin(state.clock.elsapsedTime / 10)

// Lerp is Linear Interpolation, returns a value between two others in a linear scope, in this case it will return between 0 and 1. and adds friction

// arguments: original value, target value, friction (1 is all the way, and 0 is not moving)

// ref.current.position.z = THREE.MathUtils.lerp(
//   ref.current.position.x,
//   clicked ? 1 : 0,
//   1
// );

// Use range movement with viewport

// move it upward .1 every second but restart it at the bottom of the viewport once it's traveled the height

// ref.current.position.y += 0.1;
// if (ref.current.position.y > viewport.viewport.height) {
//   ref.current.position.y = -viewport.viewport.height;
// }
// });

//spread evenly across viewport

// const [data] = useState({
//   x: THREE.MathUtils.randFloatSpread(viewport.width), //spread of -3 to 3, no wait the responsive viewport width
//   y: 1,
// });

// an online , react robot simulator has wide implications
// easy to get to and share,
// constantly updated
// google drive for robots
// from react standpoint self contained robot components easily sharable, faster redering, accessible from any device including native apps
// save to cloud movement mapping
//

// how to export things form blender
