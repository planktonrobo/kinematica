import { useContext } from "react";
import { defaultRobotState } from "../../iniitalRobot";
import Slider from "@mui/material/Slider";
import { SocketContext } from "../../context/socket";
import useAngles from "../../hooks/useAngles";

const ControlPanel = () => {
  let jointLimits = Object.values(defaultRobotState.jointLimits);
  let angles = useAngles();

  const socket = useContext(SocketContext);

  function setAngle(jointNumber, value) {
    const angleState = angles;
    angleState[jointNumber] = value;
    socket.emit("angleState", angleState);
  }


  return (
    <section className="w-full min-h-full p-8 bg-black text-white bg-opacity-90 control-panel grid grid-cols-2 gap-8">
      <div className="flex flex-col gap-2">
        <h5 className="font-bold">Joint Angles</h5>
        {angles &&
          jointLimits?.slice(0, 5).map((joint, i) => {
            return (
              <div className="w-full max-w-lg flex gap-1 items-center" key={i}>
                <span className="text-sm w-16">Joint {i + 1}</span>
                <Slider
                  aria-label="Small steps"
                  value={angles[i]}
                  step={0.00000001}
                  min={joint[0]}
                  max={joint[1]}
                  onChange={({ target }) => {
                    setAngle(i, target.value);
                  }}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ControlPanel;
