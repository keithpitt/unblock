import { useCallback } from 'react';
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

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  const spacePressed = useKeyPress('Space');

  return (
    <div className={styles.flow}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}

        // Only drag when space bar is pressed
        panOnDrag={spacePressed}

        // Pan on scroll wheel
        panOnScroll

        proOptions={proOptions}
      >
        <Background variant="dots" gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
