export default function TodoList({ value, setValue }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ListItems value={value} setValue={setValue} />
    </div>
  );
}

function ListItems({ value, setValue }) {
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
