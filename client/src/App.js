import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Robot from "./components/Robot";
import { SocketContext } from "./context/socket";
import { useContextBridge } from "@react-three/drei";
import ControlPanel from "./components/GUI/ControlPanel";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
function App() {
  const ContextBridge = useContextBridge(SocketContext);

  const CameraController = () => {
    const { camera, gl } = useThree();
    // camera.position.set(0.9189622579737351, 0.6042521523911986, 0.6399861764355654)
 
    
    useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = 4;
      controls.maxDistance = 10;
    
      return () => {
        controls.dispose();
      };
    }, [camera, gl]);
    return null;
  };
  return (
    <div>
      <Canvas>
        <ContextBridge>
          <CameraController />
          <color attach="background" args={["#faced5"]} />
          <ambientLight intensity={0.2} />
          <primitive  position={[0, -1, 0]} object={new THREE.AxesHelper(10)} />
          <Robot />
        </ContextBridge>
      </Canvas>
      <ControlPanel />
    </div>
  );
}

export default App;

// Test Socket
// const [socket, setSocket] = useState(null);
// useEffect(() => {
//   const messageListener = (message) => {
//     console.log(message);
//   };

//   const socket = io();
//   socket.on("init", messageListener);
//   return () => {
//     socket.off("init", messageListener);
//     socket.close();
//   };
// }, []);

// Test API
// const [data, setData] = useState(null);
// useEffect(() => {
//   fetch("/api", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => setData(data.message));
// }, []);
