import commandStepStyles from 'components/Flow/StepNode.module.scss';

const GROUP_PADDING = { top: 20, right: 20, left: 20, bottom: 20 };

const Y_MARGIN_BETWEEN_NODES = 20;
const X_MARGIN_BETWEEN_COLUMNS = 60;

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

    // For debugging...
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

function calculateMarginBetweenNodes(a, b) {
}

function positionsNodesIntoColumns(nodes, columns, padding = { top: 0, right: 0, bottom: 0, left: 0 }) {
  const cursor = { x: padding.top, y: padding.left };

  // Keep track of the total dimensions as we position all the things
  const dimensions = { width: 0, height: 0 }

  columns.forEach((thisColumn, thisColumnIndex) => {
    // Reset the drawing cursor back to the start
    cursor.y = padding.top;

    let maxWidthForColumn = 0;

    thisColumn.forEach((nodeId, thisNodeIndex) => {
      // Find the specific node we need to move
      const node = nodes.find((n) => n.id == nodeId);

      // Move the node to the current cursor position
      node.position = { ...cursor };

      // Because nodes have different widths, we need to know which one was the
      // widest in the column so we know much much to move to the right by
      if (node.style.width > maxWidthForColumn) {
        maxWidthForColumn = node.style.width;
      }

      // Move the cursor passed the current node
      cursor.y += node.style.height;

      // If there's another thing to render, tack on some margin, otherwise,
      // tack on our final padding
      if (thisColumn[thisNodeIndex + 1]) {
        cursor.y += Y_MARGIN_BETWEEN_NODES;

        // TODO: This is a total hack. This is to account for the group label.
        // This code shouldn't be here, and I should figure out a better way to
        // do it, but meh.
        const nextNode = nodes.find((n) => n.id == thisColumn[thisNodeIndex + 1]);
        if (nextNode.type == 'groupStep') {
          cursor.y += 40;
        }
      } else {
        cursor.y += padding.bottom;
      }

      if (cursor.y > dimensions.height) {
        dimensions.height = cursor.y;
      }
    });

    cursor.x += maxWidthForColumn;

    // If there's another column we're about to position, tack on our margin,
    // otherwise tack on our final padding.
    if (columns[thisColumnIndex + 1]) {
      cursor.x += X_MARGIN_BETWEEN_COLUMNS;
    } else {
      cursor.x += padding.right;
    }
  });

  dimensions.width = cursor.x;

  return dimensions;
}

export function magicallyPositionNodes(nodes, edges) {
  // This is a bit of a hack. This algorithim looks at nodes and edges and
  // sorts them into parallel columns. But because we have a mix of this inside
  // and out of groups, my gear gets confused when a step depends on something
  // inside a group. To account for that, I make up some bullshit edges so if
  // there's an node pointing to another node inside a group, then also create
  // a new edge that points to that group.
  const adjustedEdges = edges.reduce((arr, edge) => {
    const sourceNode = nodes.find((n) => n.id == edge.source);
    const targetNode = nodes.find((n) => n.id == edge.target);
    if (sourceNode.parentNode && !targetNode.parentNode) {
      arr.push({ ...edge, source: sourceNode.parentNode });
    }
    arr.push(edge);
    return arr;
  }, []);

  // Let's group all the nodes by their parent node
  const nodesGroupedByParentNode = nodes.reduce((h, n) => {
    if (n.parentNode) {
      const arr = (h[n.parentNode] || []);
      arr.push(n)
      h[n.parentNode] = arr;
    }
    return h;
  }, {});

  // Next, let's sort them into columns, run them through our positioner, then
  // change the width/height of the group based on what we did.
  for (const [ parentNodeId, groupedNodes ] of Object.entries(nodesGroupedByParentNode)) {
    const columns = sortNodesAndEdgesIntoColumns(groupedNodes, adjustedEdges);
    const dimensions = positionsNodesIntoColumns(nodes, columns, GROUP_PADDING);

    const parentNode = nodes.find((n) => parentNodeId == n.id);
    parentNode.style = { ...parentNode.style, ...dimensions };
  }

  // Now we've dealt with the groups, let's turn our attention to everything else
  const nodesOutsideOfGroups = nodes.filter(n => !n.parentNode);
  const remainingNodesGroupedIntoColumns = sortNodesAndEdgesIntoColumns(nodesOutsideOfGroups, adjustedEdges);
  positionsNodesIntoColumns(nodes, remainingNodesGroupedIntoColumns);

  // If for some reason we missed a node (because our code is shit) just put it
  // somewhere. Things blow up if we don't set an x/y on a node.
  nodes.filter(n => !n.position).forEach(n => n.position = { x: 0, y: 0 });

  return nodes;
};
