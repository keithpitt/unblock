import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Flow from 'components/Flow';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🎮</title>
      </Head>

      <Flow />
    </div>
  )
}
