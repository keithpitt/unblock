import { useState, useEffect } from 'react';
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
import GroupStepNode from './GroupStepNode';
import { GRID_SPACE } from './constants';

// our custom node types
const nodeTypes = {
  section: SectionNode,
  step: StepNode,
  groupStep: GroupStepNode,
};

const defaultEdgeOptions = {
  // animated: true,
  // type: 'smoothstep',
};

const proOptions = {
  // passing in the account property will enable hiding the attribution
  account: 'paid-pro',

  // in combination with the account property, hideAttribution: true will remove the attribution
  hideAttribution: true
}

const fitViewOptions = {
  maxZoom: 1
}

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
      <ReactFlow
        defaultNodes={nodes}
        // onNodesChange={onNodesChange}
        defaultEdges={edges}
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

        fitView
        maxZoom={1}
        fitViewOptions={fitViewOptions}
      >
        <Background variant="dots" gap={GRID_SPACE} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
