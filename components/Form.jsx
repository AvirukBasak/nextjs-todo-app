import { handleSubmit } from '../modules/handlers.js';
import TodoList from './List.jsx';

export default function Form({ hooks }) {
  return (
    <form onSubmit={e => e.preventDefault()} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          placeholder="Enter new todo item"
          id="item"
          value={hooks.newItem}
          onChange={e => { hooks.setNewItem(e.target.value); }} />
      </div>
      <button className="btn"
        onClick={e => {
          if (!localStorage.getItem('user-uuid')) {
            localStorage.setItem('user-uuid', crypto.randomUUID());
          }
          handleSubmit(hooks, localStorage.getItem('user-uuid'))
        }}>
        Add
      </button>
      <TodoList hooks={hooks} />
    </form>
  )
}
