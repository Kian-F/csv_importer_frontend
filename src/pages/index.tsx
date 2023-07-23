import Head from 'next/head'

import DefaultLayout from '@/src/layout/DefaultLayout'
import People from './people'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentia</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DefaultLayout>
          <People/>
      </DefaultLayout>
    </>
  )
}