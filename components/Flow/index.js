import { useState, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useKeyPress,
  ConnectionLineType,
  Background,
  Controls,
} from "reactflow";
import useStore from "./store";
import styles from "./Flow.module.scss";
import SectionNode from "./SectionNode";
import StepNode from "./StepNode";
import GroupStepNode from "./GroupStepNode";
import { GRID_SPACE } from "./constants";

// our custom node types
const nodeTypes = {
  section: SectionNode,
  step: StepNode,
  groupStep: GroupStepNode,
};

const defaultEdgeOptions = {
  // animated: true,
  type: "smoothstep",
  pathOptions: { borderRadius: 40 },
  // default: purple-600
  // selected: yellow-500
  style: {
    stroke: "currentColor",
    strokeWidth: 2,
  },
};

const proOptions = {
  // passing in the account property will enable hiding the attribution
  account: "paid-pro",

  // in combination with the account property, hideAttribution: true will remove the attribution
  hideAttribution: true,
};

const fitViewOptions = {
  maxZoom: 1,
};

const Logo = () => (
  <svg
    width="28"
    height="19"
    viewBox="0 0 28 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: "24px",
      left: "50%",
      transform: "translateX(-50%);",
      zIndex: 1000,
    }}
  >
    <g clip-path="url(#clip0_76_31873)">
      <path
        d="M0 0V4.66667V9.33333L9.33333 14V9.33333V4.66667L0 0Z"
        fill="#30F2A2"
      />
      <path
        d="M18.6667 0V4.66667V9.33333L28.0001 4.66667L18.6667 0Z"
        fill="#30F2A2"
      />
      <path
        d="M18.667 9.33333V14V18.6667L28.0003 14V9.33333V4.66667L18.667 9.33333Z"
        fill="#14CC80"
      />
      <path
        d="M9.3335 4.66667V9.33333V14L18.6668 9.33333V4.66667V0L9.3335 4.66667Z"
        fill="#14CC80"
      />
    </g>
    <defs>
      <clipPath id="clip0_76_31873">
        <rect width="28" height="18.6667" />
      </clipPath>
    </defs>
  </svg>
);

function Flow({ roomId, initialNodes, initialEdges }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const {
    liveblocks: { enterRoom, leaveRoom },
    onNodesChange,
  } = useStore();

  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom(roomId);
  }, [enterRoom, leaveRoom]);

  return (
    <div className={styles.flow}>
      <Logo />
      <ReactFlow
        defaultNodes={nodes}
        // onNodesChange={onNodesChange}
        defaultEdges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        // Only drag when space bar is pressed
        panOnDrag={useKeyPress("Space")}
        // Pan on scroll wheel
        panOnScroll
        proOptions={proOptions}
        // Snap dragging to our grid
        snapToGrid
        snapGrid={[GRID_SPACE, GRID_SPACE]}
        // Don't allow new connections to be made
        nodesConnectable={false}
        // Turn off tab to focus (for now). Handles are showing up as little blue
        // circles and I don't know how to turn them ofq
        nodesFocusable={false}
        edgesFocusable={false}
        fitView
        maxZoom={1}
        fitViewOptions={fitViewOptions}
        defaultZoom={1}
      >
        <Background
          variant="dots"
          gap={GRID_SPACE}
          size={1}
          color="currentColor"
        />
        <Controls
          showInteractive={false}
          position="top-left"
          className={styles.controls}
        />
      </ReactFlow>
    </div>
  );
}

export default Flow;
