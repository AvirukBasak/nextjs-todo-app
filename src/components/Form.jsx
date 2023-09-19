import { useEffect, useState } from 'react';
import TodoList from '@/components/List';

export default function Form() {

  const [newItem, setNewItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  /* create a session key if not exists on app start */
  useEffect(() => {
    if (!localStorage.getItem('user-uuid'))
      localStorage.setItem('user-uuid', crypto.randomUUID());
    console.log(`user uuid is ${localStorage.getItem('user-uuid')}`);
  }, []);

  /* upload data to db on todoItems change
     called 2wice on start:
     1ce on init and 1ce on todoItems changed after READ in ListItems */
  useEffect(() => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'UPDATE',
        uuid: localStorage.getItem('user-uuid'),
        timestamp: (new Date()).toLocaleString(),
        todoList: todoItems,
      })
    }).catch(e => {
      console.error(e);
      throw e;
    });
  }, [todoItems]);

  const handleSubmit = function () {
    setTodoItems(currentTodos => {
      const result = [
        ...currentTodos, {
          id: crypto.randomUUID(),
          title: newItem,
          complete: false,
        }
      ];
      setNewItem('');
      return result;
    });
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          id="item"
          type="text"
          value={newItem}
          placeholder="Enter new todo item"
          onChange={e => { setNewItem(e.target.value); }} />
      </div>
      <button className="btn" onClick={handleSubmit}>
        Add
      </button>
      <TodoList value={todoItems} setValue={setTodoItems} />
    </form>
  )
}
