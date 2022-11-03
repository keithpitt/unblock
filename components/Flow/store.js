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

  updateNodeStyle: (nodeId, style) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.style = { ...node.style, style };
        }
        return node;
      }),
    });
  },

  updateNodePosition: (nodeId, callback) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.position = callback(node.position);
        }
        return node;
      }),
    });
  }
}));

export default useStore;
