import Head from 'next/head'
import Image from 'next/image'
import Stack from '@mui/material/Stack';
import styles from '../../styles/Home.module.css'
import MatchupCard from './bet'


export default function Bets({ data }) {

  console.log('Bets :: render')
  console.log(data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Bets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bets</h1>
        
        <Stack direction="row" spacing={2}>
        {
          data.data.map((bet, betIndex) => {
            return (
              <MatchupCard {...bet} key={betIndex}></MatchupCard>
            )
          })
        }
        </Stack>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  
  console.log('bets :: getStaticProps')

  let domain = 'http://sharply-stupid.heroku.com';

  if (process.env.NODE_ENV == 'development') {
    domain = 'http://localhost:3000';
    console.log('DEV MODE!')
  } else {
    console.log('not dev mode :(')
  }

  const endpointUrl = `${domain}/api/fauna/bets/fetch-all`

  const res = await fetch(endpointUrl)
  //console.log(res)
  const data = await res.json()
  //console.log(data)

  return { props: { data } }
}