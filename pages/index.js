import App from './App';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Game Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  )
}
