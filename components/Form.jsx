import { handleSubmit } from '../modules/handlers.js';
import TodoList from './List.jsx';

export default function Form({ hooks }) {
  return (
    <form onSubmit={e => handleSubmit(hooks, e)} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          placeholder="Enter new todo item"
          id="item"
          value={hooks.newItem}
          onChange={e => { hooks.setNewItem(e.target.value); }} />
      </div>
      <button className="btn">Add</button>
      <TodoList hooks={hooks}/>
    </form>
  )
}
