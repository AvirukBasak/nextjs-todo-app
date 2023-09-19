import { useState } from 'react';
import Head from 'next/head';

import Form from '../components/Form.jsx';

export default function Home() {
  let [newItem, setNewItem] = useState("");
  let [todoItems, setTodoItems] = useState([]);
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Form hooks={{ newItem, setNewItem,
                     todoItems, setTodoItems, }} />
    </>
  );
}
