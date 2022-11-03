import create from 'zustand';

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from './initialNodes';
import initialEdges from './initialEdges';

const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  resizeNodeWithCallback: (nodeId, callback) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const result = callback({ position: node.position, style: node.style });
          node.position = { ...node.position, ...result.position };
          node.style = { ...node.style, ...result.style };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
