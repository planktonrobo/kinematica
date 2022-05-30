import "./App.css";
import { Canvas } from "@react-three/fiber";
import Robot from "./components/Robot";
import { useContext } from "react";
import { SocketContext } from "./context/socket";
import { useContextBridge } from "@react-three/drei";
import ControlPanel from "./components/GUI/ControlPanel";
import { useEffect, useState } from "react";
function App() {
  let [connected, setConnected] = useState(false)
  let socket = useContext(SocketContext);
  const ContextBridge = useContextBridge(SocketContext);

  return (
    <div>
      <Canvas camera={{}}>
        <color attach="background" args={["#faced5"]} />
        <ambientLight intensity={0.2} />
        <ContextBridge>
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
