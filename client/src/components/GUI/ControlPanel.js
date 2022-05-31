import { useContext, useState, useEffect } from "react";
import { defaultRobotState } from "../../iniitalRobot";
import Slider from "@mui/material/Slider";
import { SocketContext } from "../../context/socket";
import useAngles from "../../hooks/useAngles";
import InverseKinematic from "../../helpers/inverseKinematics";

const ControlPanel = () => {
  let jointLimits = Object.values(defaultRobotState.jointLimits);
  let angles = useAngles();
  let IK;
  IK = new InverseKinematic(
    Object.values(defaultRobotState.geometry).map((v) => [v.x, v.y, v.z])
  );

  const socket = useContext(SocketContext);
  let [IKMode, setIKMode] = useState(false);

  function setAngle(jointNumber, value) {
    const angleState = angles;
    angleState[jointNumber] = value;
    socket.emit("angleState", angleState);
  }

  let [points] = useState({ x: 10, y: 10, z: 10, rotateX: Math.PI, rotateY: 0, roll:0 });

  function setAnglesFromIK() {
    IK.calculateAngles(points.x, points.y, points.z, points.rotateX, points.rotateY, points.roll, angles);
  }

  useEffect(() => {
    if (IKMode) {
      IK.calculateAngles(points.x, points.y, points.z, points.rotateX, points.rotateY, points.roll, angles);
    }
  }, [IKMode]);

  return (
    <section className="w-full min-h-full p-8 bg-black text-white bg-opacity-90 control-panel grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-full pb-4">
          <button
            onClick={() => setIKMode(false)}
            className={`font-bold border-white rounded-full border w-full p-2 ${
              !IKMode ? "bg-white text-black" : ""
            }`}
          >
            Joint Angles
          </button>
          <button
            onClick={() => setIKMode(true)}
            className={`font-bold border-white rounded-full border w-full p-2 ${
              IKMode ? "bg-white text-black" : ""
            }`}
          >
            Inverse Kinematics
          </button>
        </div>
        {!IKMode &&
          angles &&
          jointLimits?.slice(0, 5).map((joint, i) => {
            return (
              <div className="w-full max-w-lg flex gap-1 items-center" key={i}>
                <span className="text-sm w-16 font-semibold">
                  Joint {i + 1}
                </span>
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
        {IKMode &&
          ["x", "y", "z"].map((direction, i) => {
            return (
              <div className="w-full max-w-lg flex gap-1 items-center" key={i}>
                <span className="text-sm w-16 font-semibold">{direction}</span>
                <Slider
                  aria-label="Small steps"
                  defaultValue={10}
                  step={1}
                  min={-25}
                  max={25}
                  onChange={({ target }) => {
                    points[direction] = target.value;
                    setAnglesFromIK();
                  }}
                />
              </div>
            );
          })}
          {IKMode &&
          ["rotateX", "rotateY"].map((direction, i) => {
            return (
              <div className="w-full max-w-lg flex gap-1 items-center" key={i}>
                <span className="text-sm w-16 font-semibold">{direction}</span>
                <Slider
                  aria-label="Small steps"
                  defaultValue={0}
                  step={.1}
                  min={-3.14}
                  max={3.14}
                  onChange={({ target }) => {
                    points[direction] = target.value;
                    setAnglesFromIK();
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
