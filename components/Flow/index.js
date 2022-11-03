import { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Background,
  Controls,
} from 'reactflow';

import useStore from './store';

import styles from './Flow.module.css';

import CustomNode from './CustomNode';
import StepNode from './StepNode';

const nodeTypes = {
  custom: CustomNode,
  step: StepNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

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
      >
        <Background variant="dots" gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
