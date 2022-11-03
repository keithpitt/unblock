import create from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { createClient, EnsureJson } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import initialNodes from './initialNodes';
import initialEdges from './initialEdges';

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
});

const useStore = create(
  liveblocks(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,

      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
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
