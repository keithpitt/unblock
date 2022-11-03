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
}));

export default useStore;
