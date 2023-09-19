import Head from 'next/head';
import { useState } from 'react';

import { Form } from '../components/Form.jsx';
import { TodoList, ListItems, ListItem } from '../components/List.jsx';

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

let uuid = localStorage.getItem('uuid-mongodb');
if (!uuid) {
  localStorage.setItem(crypto.randomUUID());
  uuid = localStorage.getItem('uuid');
}

setInterval(() => {
  pushData(uuid, todoItems);
}, 1000);
