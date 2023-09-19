import { useState } from 'react';
import { handleSubmit, handleToggleTodo, handleTodoDel } from '../modules/handlers.js';

let [newItem, setNewItem] = useState("");
let [todoItems, setTodoItems] = useState(initData);

export newItem;
export setNewItem;
export todoItems;
export setTodoItems;

export function TodoList() {
  return (
    <div>
      <h1>Todo List</h1>
      <ListItems />
    </div>
  );
}

export function ListItems() {
  return (
    <ul className="list">
      {
        todoItems.map(
          (item, i) => item && item.title
            ? <ListItem idx={i} />
            : null
        )
      }
    </ul>
  );
}

export function ListItem({ idx }) {
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
