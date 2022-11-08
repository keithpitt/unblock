import { useEffect, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useKeyPress,
  ConnectionLineType,
  Background,
  Controls,
} from 'reactflow';
import useStore from './store';
import styles from './Flow.module.css';
import SectionNode from './SectionNode';
import StepNode from './StepNode';
import { GRID_SPACE } from './constants';
import Cursor from 'components/Cursor';

// our custom node types
const nodeTypes = {
  section: SectionNode,
  step: StepNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

const proOptions = {
  // passing in the account property will enable hiding the attribution
  account: 'paid-pro',

  // in combination with the account property, hideAttribution: true will remove the attribution
  hideAttribution: true
}

function Flow({ roomId, initialEdges, initialNodes }) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    liveblocks: { enterRoom, leaveRoom },
    init,
    nodes,
    edges,
    setCursor,
    onNodesChange,
  } = useStore();

  useEffect(() => {
    init({ edges: initialEdges, nodes: initialNodes });
  }, [initialEdges, initialNodes]);

  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom(roomId);
  }, [enterRoom, leaveRoom]);

  const [ reactFlowBounds, setReactFlowBounds ] = useState(null);

  const onPointerEnter = (e) => {
    // We need the bounds when ever the mouse is moving around, so we might as
    // well cache it when the mouse enters the area
    setReactFlowBounds(reactFlowWrapper.current.getBoundingClientRect());
  }

  const onPointerMove = (e) => {
    e.preventDefault();

    if (reactFlowWrapper && reactFlowInstance && reactFlowBounds) {
      // Calculate the cursor relative to where it is in the react flow canvas
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      setCursor(position);
    }
  };

  const onPointerLeave = (e) => {
    e.preventDefault();

    // Mouse has gone!
    // setCursor(null);
  };

  const otherCursors = useStore((state) => state.liveblocks.others).map((user) => [ user.connectionId, user.presence.cursor ]);

  // const others = useOthersMapped(
  //   (other) => ({
  //     cursor: other.presence.cursor,
  //     info: other.info,
  //   })
  // );

  const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];

  // const onPaneMove = (_, viewport) => {
  //   if (viewport) {
  //   console.log(_, viewport);
  //   }
  // }

  return (
    <div
      className={styles.flow}
      ref={reactFlowWrapper}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >

    <div style={{position: "absolute"}}>

        {otherCursors.map(([id, cursor]) => {
          if (cursor == null) {
            return null;
          }

          return (
            <Cursor
            key={`cursor-${id}`}
            color={`rgb(${
                  COLORS_PRESENCE[id % COLORS_PRESENCE.length]
                }`}
            x={cursor.x}
            y={cursor.y}
          />
          );
        })}
      </div>


      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}

        // Only drag when space bar is pressed
        panOnDrag={useKeyPress('Space')}

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

        onMove={onPaneMove}

      //onPaneMouseMove={onPaneMouseMove}
    //onPaneMouseLeave={onPaneMouseLeave}

        onInit={setReactFlowInstance}
      >
        <Background variant="dots" gap={GRID_SPACE} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
