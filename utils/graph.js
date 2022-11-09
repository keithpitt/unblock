import { magicallyPositionNodes } from './layout';

const GRID_SPACE = 20;

const COMMAND_STEP_HEIGHT = GRID_SPACE * 2;
const COMMAND_STEP_WIDTH = 200;
const MARGIN_BETWEEN_NODES = GRID_SPACE;

function transformDepsIntoEdges(lookup, stepEdge) {
  return stepEdge.node.dependencies.edges.reduce((reactFlowEdges, depEdge) => {
    const targetStep = lookup[depEdge.node.key]

    if(targetStep) {
      reactFlowEdges.push({
        id: depEdge.node.uuid,
        source: targetStep.uuid,
        target: stepEdge.node.uuid
      });
    }

    return reactFlowEdges;
  }, []);
}

function estimateDimensionsOfGroupStep(stepEdge) {
  const numberOfSteps = stepEdge.node.steps.edges.length;

  const heightOfAllSteps = numberOfSteps * COMMAND_STEP_HEIGHT;
  const marginInBetweenSteps = (numberOfSteps - 1) * MARGIN_BETWEEN_NODES;
  const padding = MARGIN_BETWEEN_NODES;

  return {
    width: COMMAND_STEP_WIDTH + (padding * 2),
    height: ((padding * 2) + heightOfAllSteps + marginInBetweenSteps)
  };
}

export function generateGraphFromBuildSteps(steps) {
  // Generate a quick lookup of all the steps by their key (if they have one)
  // and their id. We need this as we loop through the dependencies and lookup
  // the associated step.
  const lookup = steps.edges.reduce((l, stepEdge) => {
    if (stepEdge.node.key) {
      l[stepEdge.node.key] = stepEdge.node;
    }
    l[stepEdge.node.uuid] = stepEdge.node;

    // If this is a group, loop through it's steps as well and add them to the lookup
    if(stepEdge.node.__typename == "StepGroup") {
      stepEdge.node.steps.edges.forEach(groupStepEdge => {
        if (groupStepEdge.node.key) {
          l[groupStepEdge.node.key] = groupStepEdge.node;
        }
        l[groupStepEdge.node.uuid] = groupStepEdge.node;
      });
    }

    return l;
  }, {});

  const reactFlowEdges = [];
  const reactFlowNodes = [];

  steps.edges.forEach(stepEdge => {
    // Convert the step into a node
    const reactFlowNode = {
      id: stepEdge.node.uuid,
      data: { label: stepEdge.node.label },
      type: "step",
      style: { width: 200, height: COMMAND_STEP_HEIGHT },
      targetPosition: "left",
      sourcePosition: "right",
    }

    reactFlowEdges.push(...transformDepsIntoEdges(lookup, stepEdge));

    // If this is a group, also add any steps from it to the graph
    if(stepEdge.node.__typename == "StepGroup") {
      // This step is actaully a group so change the node type and estimate
      // what it's height is going to be
      reactFlowNode.type = "groupStep";
      reactFlowNode.style = estimateDimensionsOfGroupStep(stepEdge);
      reactFlowNode.dragHandle = ".GroupStepDragHandle";

      stepEdge.node.steps.edges.forEach(groupStepEdge => {
        // Convert the step into a node
        reactFlowNodes.push({
          id: groupStepEdge.node.uuid,
          data: { label: groupStepEdge.node.label },
          type: "step",

          // This is a step inside a group so attach ourselves to it
          extent: "parent",
          parentNode: stepEdge.node.uuid,

          style: { width: 200, height: COMMAND_STEP_HEIGHT },

          // Steps within a group shouldn't be draggable
          // draggable: false,

          targetPosition: "left",
          sourcePosition: "right",
        });

        reactFlowEdges.push(...transformDepsIntoEdges(lookup, groupStepEdge));
      });
    }

    reactFlowNodes.push(reactFlowNode);
  });

  // Parent nodes need to be first in the nodes array so they render properly:
  // https://reactflow.dev/docs/guides/sub-flows/
  const sortedReactFlowNodes = reactFlowNodes.sort((a, b) => {
    return a.type == "groupStep" ? -1 : 0;
  });

  // Set default positions for all the nodes
  const positionedReactFlowNodes = magicallyPositionNodes(sortedReactFlowNodes, reactFlowEdges);

  return { edges: reactFlowEdges, nodes: positionedReactFlowNodes }
}
