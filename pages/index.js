import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sharply Stupid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}> */}
        <h1 className={styles.title}><i>Sharply</i> Stupid!</h1>
      {/* </main> */}
    </div>
  )
}
