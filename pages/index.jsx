import { useState } from 'react';
import Head from 'next/head';

import Form from '../components/Form.jsx';

function componentDidMount() {
  let uuid = localStorage.getItem('uuid-mongodb');
  if (!uuid) {
    localStorage.setItem(crypto.randomUUID());
    uuid = localStorage.getItem('uuid');
  }
  return [];
}

export default function Home() {
  const initData = [];
  let [newItem, setNewItem] = useState("");
  let [todoItems, setTodoItems] = useState(initData);
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
