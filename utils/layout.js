import commandStepStyles from 'components/Flow/StepNode.module.scss';

function sortNodesAndEdgesIntoColumns(nodes, edges) {
  const dependencyHash = nodes.reduce((h, n) => { h[n.id] = []; return h }, {});

  edges.forEach((edge) => {
    if (dependencyHash[edge.target] && dependencyHash[edge.source]) {
      dependencyHash[edge.target].push(edge.source);
    }
  });

  const columns = [];

  while (true) {
    // No more dependencies to walk through, we're all done!
    if (Object.keys(dependencyHash).length == 0) {
      break;
    }

    // for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
    //   console.log(`${nodes.find((n) => n.id == nodeId).data.label}`);
    //   sourceIds.forEach((v) => console.log(`\t${nodes.find((n) => n.id == v).data.label}`));
    // }

    const thisColumn = []

    // Find the next node that doesn't have any incomming dependencies and move
    // it to the current column
    for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
      if (sourceIds.length == 0) {
        thisColumn.push(nodeId);
        delete dependencyHash[nodeId];
      }
    }

    // Go through all the dependencies again and remove all the references to
    // the nodes we just added to the current column. This will start to leave
    // a bunch of nodes with no more incoming dependencies that'll get removed
    // in the next iteration of that loop.
    for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
      dependencyHash[nodeId] = sourceIds.filter((v) => thisColumn.indexOf(v) == -1);
    }

    columns.push(thisColumn);
  }

  return columns;
}

function positionsNodesFromColumns(nodes, columns) {
  const cursor = { x: 20, y: 20 };

  columns.forEach((thisColumn) => {
    // Reset the drawing cursor back to the start
    cursor.y = 20;
    let maxWidthForColumn = 0;

    thisColumn.forEach((nodeId) => {
      const node = nodes.find((n) => n.id == nodeId);

      node.position = { ...cursor };

      if (node.style.width > maxWidthForColumn) {
        maxWidthForColumn = node.style.width;
      }

      cursor.y = cursor.y + node.style.height + 20;
    });

    cursor.x = cursor.x + maxWidthForColumn + 60;
  });

}

export function magicallyPositionNodes(nodes, edges) {

  // blah
  // edges.forEach((edge) => {
  //   if (dependencyHash[edge.target]) {
  //     // If the source of this dependency is inside a group, let's redirect the
  //     // dependency to the group itself
  //     const sourceNode = nodes.find((n) => n.id == edge.source);
  //     if (sourceNode.parentNode) {
  //       dependencyHash[edge.target].push(sourceNode.parentNode);
  //     } else {
  //       dependencyHash[edge.target].push(edge.source);
  //     }
  //   }
  // });

  // First things first, let's arrange the nodes within groups. That needs to
  // happen first so the groups height/widths can be calculated, which will
  // affect how everything else sits on the page.

  const nodesGroupedByParentNode = nodes.reduce((h, n) => {
    if (n.parentNode) {
      const arr = (h[n.parentNode] || []);
      arr.push(n)
      h[n.parentNode] = arr;
    }
    return h;
  }, {});

  for (const [ parentNode, groupedNodes ] of Object.entries(nodesGroupedByParentNode)) {
    const x = sortNodesAndEdgesIntoColumns(groupedNodes, edges);
    console.log(x);
  }


  const dependencyHash = {}

  nodes.forEach((node) => {
    if (node.parentNode) { return; }
    dependencyHash[node.id] = [];
  });

  edges.forEach((edge) => {
    if (dependencyHash[edge.target]) {
      // If the source of this dependency is inside a group, let's redirect the
      // dependency to the group itself
      const sourceNode = nodes.find((n) => n.id == edge.source);
      if (sourceNode.parentNode) {
        dependencyHash[edge.target].push(sourceNode.parentNode);
      } else {
        dependencyHash[edge.target].push(edge.source);
      }
    }
  });

  const columns = [];

  while (true) {
    // No more dependencies to walk through, we're all done!
    if (Object.keys(dependencyHash).length == 0) {
      break;
    }

    // for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
    //   console.log(`${nodes.find((n) => n.id == nodeId).data.label}`);
    //   sourceIds.forEach((v) => console.log(`\t${nodes.find((n) => n.id == v).data.label}`));
    // }

    const thisColumn = []

    // Find the next node that doesn't have any incomming dependencies and move
    // it to the current column
    for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
      if (sourceIds.length == 0) {
        thisColumn.push(nodeId);
        delete dependencyHash[nodeId];
      }
    }

    // Go through all the dependencies again and remove all the references to
    // the nodes we just added to the current column. This will start to leave
    // a bunch of nodes with no more incoming dependencies that'll get removed
    // in the next iteration of that loop.
    for (const [ nodeId, sourceIds ] of Object.entries(dependencyHash)) {
      dependencyHash[nodeId] = sourceIds.filter((v) => thisColumn.indexOf(v) == -1);
    }

    columns.push(thisColumn);
  }

  const cursor = { x: 20, y: 20 };

  columns.forEach((thisColumn) => {
    // Reset the drawing cursor back to the start
    cursor.y = 20;
    let maxWidthForColumn = 0;

    thisColumn.forEach((nodeId) => {
      const node = nodes.find((n) => n.id == nodeId);

      if (node.type == "groupStep") {
        cursor.y += 40;
      }

      node.position = { ...cursor };

      if (node.style.width > maxWidthForColumn) {
        maxWidthForColumn = node.style.width;
      }

      cursor.y = cursor.y + node.style.height + 20;
    });

    cursor.x = cursor.x + maxWidthForColumn + 60;
  });

  const cursorsByParentNode = {};

  nodes.forEach((node) => {
    if (node.parentNode) {
      if (!cursorsByParentNode[node.parentNode]) {
        cursorsByParentNode[node.parentNode] = { x: 20, y: 20 }
      }

      node.position = { ...cursorsByParentNode[node.parentNode] };
      cursorsByParentNode[node.parentNode].y += node.style.height + 20;
    }
  });

  return nodes;
};
