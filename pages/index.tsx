import Head from 'next/head'
import PitchDeck from '../src/components/PitchDeck'

export default function Home() {
  return (
    <>
      <Head>
        <title>GatorEx - UF Student Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        <PitchDeck />
      </div>
    </>
  )
}