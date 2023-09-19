import { newItem, setNewItem, todoItems, setTodoItems } from '../components/List.jsx';
import { handleSubmit, handleToggleTodo, handleTodoDel } from '../modules/handlers.js';

export function Form() {
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
      <TodoList />
    </form>
  )
}
