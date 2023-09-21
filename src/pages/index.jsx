import Head from 'next/head';
import Form from '@/components/Form';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>NextJS Todo App</title>
        <link rel="icon" href="favicon.ico" />
        <link rel="icon" sizes="any" type="image/svg+xml" href="favicon.svg" />
      </Head>
      <Form />
    </>
  );
}
