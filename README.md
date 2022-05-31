# kinematica


This is a React 3 Fiber implementation of a 6-axis robot arm, controlled with a web socket. Adapted from https://github.com/glumb/robot-gui

Interesting features include: 

• A recursive react component tree, implemented to make each robot link a sub-group of the previous.
• Web socket control so that angle manipulaton passes from control panel to server and back to robot mesh in realtime
• Inverse kinematics so that robot can go to specified points on the 3D plane

