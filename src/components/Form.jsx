import { useState } from 'react';
import { handleSubmit } from '../modules/handlers.js';
import TodoList from './List.jsx';

export default function Form() {

  const [newItem, setNewItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  return (
    <form onSubmit={e => e.preventDefault()} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          placeholder="Enter new todo item"
          id="item"
          value={newItem}
          onChange={e => { setNewItem(e.target.value); }} />
      </div>
      <button className="btn"
        onClick={e => {
          if (!localStorage.getItem('user-uuid')) {
            localStorage.setItem('user-uuid', crypto.randomUUID());
          }
          handleSubmit(localStorage.getItem('user-uuid'), newItem, setTodoItems, setNewItem);
        }}>
        Add
      </button>
      <TodoList todoItemsHook={[ todoItems, setTodoItems ]} />
    </form>
  )
}
