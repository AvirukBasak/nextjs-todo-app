import { useEffect } from 'react';

export default function TodoList({ value, setValue }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ListItems value={value} setValue={setValue} />
    </div>
  );
}

function ListItems({ value, setValue }) {

  /* load list from server on first render */
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
      setValue(currentItems => resBody?.data?.todoList || currentItems);
    }).catch(e => {
      console.error(e);
      throw e;
    })
  }, []);

  return (
    <ul className="list">
      {
        value.map(
          item => item && item.title
            ? <ListItem value={item} setTodoItems={setValue} />
            : null
        )
      }
    </ul>
  );
}

function ListItem({ value, setTodoItems }) {

  const handleToggleTodo = (id, isComplete) => {
    setTodoItems(currentTodos => currentTodos.map(
      item => item && item.id === id
        ? { ...item, complete: isComplete }
        : item
    ));
  }

  const handleTodoDel = (id) => {
    setTodoItems(currentTodos => currentTodos.filter(
      item => item && item.id !== id
    ));
  }

  return (
    <li key={value.id}>
      <label>
        <input
          type="checkbox"
          checked={value.complete}
          onChange={e => handleToggleTodo(value.id, e.target.checked)} />
        {value.title}
      </label>
      <button
        className="btn btn-danger"
        onClick={e => handleTodoDel(value.id)} >
        Delete
      </button>
    </li>
  );
}
