import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Flow from 'components/Flow';

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Upload Pipeline' },
    position: { x: 250, y: 5 },
    type: 'step'
  },
  {
    id: '2',
    data: { label: 'Build Docker Image' },
    position: { x: 100, y: 100 },
    type: 'step'
  },
  {
    id: '3',
    data: { label: 'Linting' },
    position: { x: 400, y: 100 },
    type: 'step'
  },
  {
    id: '4',
    data: { label: 'Deploy to Production' },
    position: { x: 400, y: 200 },
    style: { height: 100, width: 100 },
    zIndex: -1,
    type: 'section'
  },
];

export async function getServerSideProps(context) {
  let roomId = context.query['room'];
  if (roomId === null || roomId === undefined || (roomId && roomId.trim() === "")) {
    roomId = "default";
  }

  const res = await fetch(`https://api.liveblocks.io/v2/rooms/${encodeURIComponent(roomId)}/storage`, {
    headers: { Authorization: `Bearer ${process.env.LIVEBLOCKS_PRIVATE_KEY}` }
  });
  const json = await res.json()

  return { props: { roomId, initialEdges, initialNodes } };
}

export default function Home({ roomId }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>🎮</title>
      </Head>

      <Flow roomId={roomId} initialEdges={initialEdges} initialNodes={initialNodes} />
    </div>
  )
}
