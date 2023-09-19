import { useEffect, useState } from 'react';
import { handleToggleTodo, handleTodoDel } from '../modules/handlers.js';

export default function TodoList({ todoItemsHook }) {

  const [todoItems, setTodoItems] = todoItemsHook;

  return (
    <div>
      <h1>Todo List</h1>
      <ListItems todoItemsHook={[todoItems, setTodoItems]} />
    </div>
  );
}

function ListItems({ todoItemsHook }) {

  const [todoItems, setTodoItems] = todoItemsHook;

  useEffect(() => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'READ',
        uuid: localStorage.getItem('user-uuid'),
        timestamp: (new Date()).toLocaleString(),
      })
    }).then(async data => {
      const resBody = await data.json();
      setTodoItems(currentItems => resBody?.data?.todoItems
        ? resBody?.data?.todoItems
        : currentItems
      );
    }).catch(e => {
      console.error(e);
      throw e;
    })
  }, []);

  return (
    <ul className="list">
      {
        todoItems.map(
          (item, i) => item && item.title
            ? <ListItem items={todoItems}
              idx={i}
              todoItemsHook={[todoItems, setTodoItems]} />
            : null
        )
      }
    </ul>
  );
}

function ListItem({ items, idx, todoItemsHook }) {

  const [todoItems, setTodoItems] = todoItemsHook;
  const content = items[idx];

  return (
    <li key={content.id}>
      <label>
        <input
          type="checkbox"
          checked={content.complete}
          onChange={e => handleToggleTodo(content.id, e.target.checked, setTodoItems)} />
        {content.title}
      </label>
      <button
        className="btn btn-danger"
        onClick={e => handleTodoDel(content.id, setTodoItems)} >
        Delete
      </button>
    </li>
  );
}
