import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Flow from 'components/Flow';

export async function getServerSideProps(context) {
  let roomId = context.query['room'];
  if (roomId === null || roomId === undefined || (roomId && roomId.trim() === "")) {
    roomId = "default";
  }

  return { props: { roomId } };
}

export default function Home({ roomId }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>🎮</title>
      </Head>

      <Flow roomId={roomId} />
    </div>
  )
}
