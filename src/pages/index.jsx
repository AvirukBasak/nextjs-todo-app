import Head from 'next/head';
import Form from '../components/Form.jsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Form />
    </>
  );
}
