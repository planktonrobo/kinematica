export function createLinkGroup(x, y, z, w, h, d, min, max, jointNumber) {
  const thicken = 1;
  const w_thickened = Math.abs(w) + thicken;
  const h_thickened = Math.abs(h) + thicken;
  const d_thickened = Math.abs(d) + thicken;

  // create group
  let groupPositon = [x, y, z];
  let groupRotation = [0, 0, 0];


  // create link
  let boxGeometry = [w_thickened, h_thickened, d_thickened];
  let boxPosition = [w / 2, h / 2, d / 2];

  let link = { boxGeometry, boxPosition, groupPositon, groupRotation };

  // add joint 

  let jointRotation = [0, 0, 0];

  let jointGeo = {
    shape: [0.8, 0.8, 0.8 * 2, 32, 32, false, -min, 2 * Math.PI - max + min],
    color: "grey", // TO DO - ADD COLORS
  };
  let jointGeoMax = {
    shape: [0.8, 0.8, 0.8 * 2, 32, 32, false, -max, max],
    color: "grey",
  };
  let jointGeoMin = {
    shape: [0.8, 0.8, 0.8 * 2, 32, 32, false, 0, -min],
    color: "grey",
  };

  switch (jointNumber) {
    case 0:
      jointRotation = [Math.PI / 2, 0, 0];

      break;
    case 1:
      // joint.rotation.x = Math.PI / 2
      break;
    case 2:
      // joint.rotation.x = Math.PI / 2
      break;
    case 3:
      jointRotation = [0, 0, Math.PI / 2];

      // joint.rotation.y = Math.PI
      break;
    case 4:
      // joint.rotation.x = Math.PI / 2
      jointRotation = [0, Math.PI / 2, 0];
      break;
    case 5:
      jointRotation = [Math.PI / 2, 0, 0];
      groupRotation = [0, Math.PI / 2, 0];
      break;
  }

  let joint = {
    geo: jointGeo,
    max: jointGeoMax,
    min: jointGeoMin,
    rotation: jointRotation,
    jointNumber,
  };

  let branches = []; // branches for tree 

  let jointParent = jointNumber === 0 ? null : jointNumber - 1;
  return {
    link,
    joint,
    branches,
    jointNumber,
    jointParent,
  };
}

export function createDataTree(V_Initial, limits) {
  let x = 0,
    y = 0,
    z = 0;

  let bones = [];

  for (let i = 0; i < V_Initial.length; i++) {
    const link = V_Initial[i];

    const linkGeo = createLinkGroup(
      x,
      y,
      z,
      link[0],
      link[1],
      link[2],
      limits[i][0],
      limits[i][1],
      i
    );

    x = link[0];
    y = link[1];
    z = link[2];

    bones.push(linkGeo);
  }

 // create a data tree that nests the child link into the parent

  const jointMapping = bones?.reduce((acc, el, i) => {
    acc[el.jointNumber] = i;
    return acc;
  }, {});
  let root;

  bones?.forEach((el) => {
    // Handle the root element
    if (el.jointParent === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = bones[jointMapping[el.jointParent]];
    // Add our current el to its parent's `children` array
    parentEl.branches = [...(parentEl.branches || []), el];
  });

  return [root]
}
