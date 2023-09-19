import { handleToggleTodo, handleTodoDel } from '../modules/handlers.js';

// add code to pull data from db with api endpoint at /api/todos

export default function TodoList({ hooks }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ListItems hooks={hooks} />
    </div>
  );
}

function ListItems({ hooks }) {
  return (
    <ul className="list">
      {
        hooks.todoItems.map(
          (item, i) => item && item.title
            ? <ListItem hooks={hooks} idx={i} />
            : null
        )
      }
    </ul>
  );
}

function ListItem({ hooks, idx }) {
  const content = hooks.todoItems[idx];
  return (
    <li key={content.id}>
      <label>
        <input
          type="checkbox"
          checked={content.complete}
          onChange={e => handleToggleTodo(hooks, e.target.checked, content.id)} />
        {content.title}
      </label>
      <button
        className="btn btn-danger"
        onClick={e => handleTodoDel(hooks, content.id)} >
        Delete
      </button>
    </li>
  );
}
