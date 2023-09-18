import Head from "next/head";
import { useState } from "react";

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

import { pushData, pullData } from '../src/mongodb';

async function Form() {

  let uuid = localStorage.getItem('uuid-mongodb');
  if (!uuid) {
    localStorage.setItem(crypto.randomUUID());
    uuid = localStorage.getItem('uuid');
  }

  const initData = await pullData(uuid);

  let [newItem, setNewItem] = useState("");
  let [todoItems, setTodoItems] = useState(initData);

  setInterval(() => {
    pushData(uuid, todoItems);
  }, 1000);

  const handleSubmit = (event) => {
    const e = event;
    e.preventDefault();
    setTodoItems(currentTodos => [
      ...currentTodos, {
        id: crypto.randomUUID(),
        title: newItem,
        complete: false,
      }
    ]);
    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          placeholder="Enter new todo item"
          id="item"
          value={newItem}
          onChange={e => { setNewItem(e.target.value); }} />
      </div>
      <button className="btn">Add</button>
      <TodoList todoItems={todoItems} setTodos={setTodoItems} />
    </form>
  );
}

function TodoList({ todoItems, setTodos }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ListItems todoItems={todoItems} setTodos={setTodos} />
    </div>
  );
}

function ListItems({ todoItems, setTodos }) {
  return (
    <ul className="list">
      {
        todoItems.map(
          (item, i) => item && item.title
            ? <ListItem todoItems={todoItems} idx={i} setTodos={setTodos} />
            : null
        )
      }
    </ul>
  );
}

function ListItem({ todoItems, idx, setTodos }) {
  const handleToggleTodo = (complete, id) => {
    setTodos(currentTodos => currentTodos.map(
      item => item && item.id === id
        ? { ...item, complete }
        : item
    ));
  }

  const handleTodoDel = (id) => {
    setTodos(currentTodos => currentTodos.filter(
      item => item && item.id !== id
    ));
  }

  const content = todoItems[idx];
  return (
    <li key={content.id}>
      <label>
        <input
          type="checkbox"
          checked={content.complete}
          onChange={e => handleToggleTodo(e.target.checked, content.id)} />
        {content.title}
      </label>
      <button
        className="btn btn-danger"
        onClick={e => handleTodoDel(content.id)} >
        Delete
      </button>
    </li>
  );
}
