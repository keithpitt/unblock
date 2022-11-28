import create from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { createClient, EnsureJson } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
});

const useStore = create(
  liveblocks(
    (set, get) => ({
      nodes: [],
      edges: [],

      init: ({ nodes, edges }) => {
        set({ nodes, edges });
      },

      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },

      addNewNode: (node) => {
        if (!node.id) {
          node.id = `dndnode_${Math.random() * 10000}`;
        }

        set({ nodes: [...get().nodes, node] });
      },

      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },

      updateNodeStyle: (nodeId, callback) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              const result = callback(node);
              // Setting `updatedAt` is a bit of a hack. Changing style doesn't
              // seem to trigger a re-render of a custom node, which is what we
              // rely on to update the moveable box on other clients.
              return { ...node, style: result, data: { ...node.data, updatedAt: new Date().toString() } };
            }
            return node;
          }),
        });
      },

      updateNodePosition: (nodeId, callback) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, position: callback(node) };
            }
            return node;
          }),
        });
      },

      updateNodeData: (nodeId, callback) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, ...callback(node) } };
            }
            return node;
          }),
        });
      },
    }),
    {
      client,
      storageMapping: {
        nodes: true,
        edges: true
      }
    }
  )
);

export default useStore;
