import { useEffect, useContext, useCallback, useState } from "react";
import { SocketContext } from "../context/socket";
export default function useAngles(init) {
  const socket = useContext(SocketContext);
  let [angles, setAngles] = useState();

  const handleAngles = useCallback((message) => {
    setAngles(message.data);
  }, []);

  useEffect(() => {
    socket.on("angleState", handleAngles);

    return () => {
      socket.off("angleState");
    };
  }, [socket]);

  return angles;
}
