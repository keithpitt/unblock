import { useRef, useCallback, useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useKeyPress,
  ConnectionLineType,
  Background,
  Controls,
  ControlButton
} from "reactflow";
import useStore from "./store";
import styles from "./Flow.module.scss";
import SectionNode from "./SectionNode";
import MediaNode from "./MediaNode";
import StepNode from "./StepNode";
import EmojiNode from "./EmojiNode";
import GroupStepNode from "./GroupStepNode";
import Toolbar from "./Toolbar";
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
  const { theme, setTheme } = useTheme()
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  return (
    <Controls
      showInteractive={false}
      position="top-left"
      className={styles.controls}
    >
      <ControlButton onClick={() => toggleTheme()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" fill="currentColor" className={styles.themeIcon}>
        {
          (theme === "light") ?
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
          :
            <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
        }
      </svg>

      </ControlButton>
    </Controls>
  )
}

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

  const [ toolbarMode, setToolbarMode ] = useState('move');
  const [ reactFlowInstance, setReactFlowInstance ] = useState(null);

  const {
    init,
    liveblocks: { enterRoom, leaveRoom },
    addNewNode,
    onNodesChange,
    onEdgesChange,
    nodes,
    edges,
    addSection
  } = useStore();

  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom(roomId);
  }, [enterRoom, leaveRoom]);

  useEffect(() => {
    init({ nodes: initialNodes, edges: initialEdges });
  }, [ initialNodes, initialEdges ]);

  const onClick = useCallback((event) => {
    if (reactFlowInstance) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const position = reactFlowInstance.project({ x: event.clientX - wrapperBounds.x, y: event.clientY - wrapperBounds.top });

      if (toolbarMode == 'section') {
        addNewNode({ type: 'section', data: { label: "New Section" }, position: position, style: { height: 200, width: 200 }, zIndex: -1 });
      } else if (toolbarMode == 'media') {
        addNewNode({ type: 'media', data: { src: prompt("Enter a URL") }, position: position, style: { height: 200, width: 200 }, zIndex: -1 });
      } else if (toolbarMode == 'emoji') {
        addNewNode({ type: 'emoji', data: { emoji: prompt("Enter an emoji") }, position: position, style: { height: 30, width: 30 }, zIndex: -1 });
      }

      setToolbarMode('move');
    }
  }, [reactFlowInstance, toolbarMode]);


  const onToolbarButtonClick = useCallback((mode) => {
    setToolbarMode(mode);
  }, []);

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.flow}>
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
