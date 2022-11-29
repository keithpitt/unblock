import { useRef, useCallback, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useKeyPress,
  ConnectionLineType,
  Background,
  Controls,
  ControlButton,
} from "reactflow";
import useStore from "./store";
import styles from "./Flow.module.scss";
import SectionNode from "./SectionNode";
import MediaNode from "./MediaNode";
import StepNode from "./StepNode";
import EmojiNode from "./EmojiNode";
import GroupStepNode from "./GroupStepNode";
import Toolbar from "./Toolbar";
import Friends from "./Friends";
import { GRID_SPACE } from "./constants";

// our custom node types
const nodeTypes = {
  section: SectionNode,
  media: MediaNode,
  step: StepNode,
  groupStep: GroupStepNode,
  emoji: EmojiNode,
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

const UIControls = () => {
  const { theme, setTheme } = useTheme();
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <Controls
      showInteractive={false}
      position="top-left"
      className={styles.controls}
    >
      <ControlButton onClick={() => toggleTheme()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          style={{
            maxWidth: 18,
            maxHeight: 18,
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z"
            fill="currentColor"
          />
          {theme === "light" ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 10.4303 17.3972 9.00141 16.4105 7.93213L7.93214 16.4105C9.00142 17.3972 10.4303 18 12 18Z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M16.4105 7.93213L7.93213 16.4105C6.7441 15.3143 6 13.744 6 12C6 8.68629 8.68629 6 12 6C13.744 6 15.3143 6.7441 16.4105 7.93213Z"
              fill="currentColor"
            />
          )}
        </svg>
      </ControlButton>
    </Controls>
  );
};

const Logo = () => (
  <div className={styles.logo}>
    <svg
      width="28"
      height="19"
      viewBox="0 0 28 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_76_31873)">
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
  </div>
);

function Flow({ roomId, initialNodes, initialEdges }) {
  const wrapperRef = useRef(null);

  const [toolbarMode, setToolbarMode] = useState("move");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [viewport, setViewport] = useState(null);
  const [isMouseDown, setMouseDown] = useState(null);

  const {
    init,
    liveblocks: { enterRoom, leaveRoom },
    setCursor,
    setInteracting,
    addNewNode,
    onNodesChange,
    onEdgesChange,
    nodes,
    edges,
    addSection,
  } = useStore();

  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom(roomId);
  }, [enterRoom, leaveRoom]);

  useEffect(() => {
    init({ nodes: initialNodes, edges: initialEdges });
  }, [initialNodes, initialEdges]);

  const onClick = useCallback(
    (event) => {
      if (reactFlowInstance) {
        const wrapperBounds = wrapperRef.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - wrapperBounds.x,
          y: event.clientY - wrapperBounds.top,
        });

        if (toolbarMode == "section") {
          addNewNode({
            type: "section",
            data: { label: "New Section" },
            position: position,
            style: { height: 200, width: 200 },
            zIndex: -1,
          });
        } else if (toolbarMode == "media") {
          addNewNode({
            type: "media",
            data: { src: prompt("Enter a URL") },
            position: position,
            style: { height: 200, width: 200 },
            zIndex: -1,
          });
        } else if (toolbarMode == "emoji") {
          addNewNode({
            type: "emoji",
            data: { emoji: prompt("Enter an emoji") },
            position: position,
            style: { height: 30, width: 30 },
            zIndex: -1,
          });
        }

        setToolbarMode("move");
      }
    },
    [reactFlowInstance, wrapperRef, toolbarMode]
  );

  const onToolbarButtonClick = useCallback((mode) => {
    setToolbarMode(mode);
  }, []);

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const onMove = useCallback((event, viewport) => {
    setViewport(viewport);
  }, []);

  const onPaneMouseMove = useCallback(
    (event) => {
      if (reactFlowInstance && wrapperRef) {
        const wrapperBounds = wrapperRef.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - wrapperBounds.x,
          y: event.clientY - wrapperBounds.top,
        });
        setCursor(position);
      }
    },
    [reactFlowInstance, wrapperRef]
  );

  const onMouseDown = useCallback((event) => {
    setInteracting(true);
  }, []);

  const onMouseUp = useCallback((event) => {
    setInteracting(false);
  }, []);

  const onNodeDrag = useCallback((event) => {
    setInteracting(true);
  }, []);

  const onNodeDragStop = useCallback((event) => {
    setInteracting(false);
  }, []);

  const onMouseLeave = useCallback((event) => {
    setCursor(null);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.flow}
      onMouseMove={onPaneMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <Friends viewport={viewport} />
      <Logo />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        // Only drag when space bar is pressed
        panOnDrag={useKeyPress("Space")}
        // Pan on scroll wheel
        panOnScroll
        proOptions={proOptions}
        onInit={onInit}
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
        defaultzoom={1}
        onPaneClick={onClick}
        onMove={onMove}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
      >
        <Background
          variant="dots"
          gap={GRID_SPACE}
          size={1}
          color="currentColor"
        />
        <UIControls />
        <Toolbar mode={toolbarMode} onButtonClick={onToolbarButtonClick} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
