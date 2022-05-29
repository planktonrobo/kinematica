import "./App.css";
import { Canvas} from "@react-three/fiber";
import Robot from "./components/Robot";


function App() {
  return (
    <Canvas>
      <Robot />
    </Canvas>
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
