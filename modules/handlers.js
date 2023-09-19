import { newItem, setNewItem, todoItems, setTodoItems } from '../components/List.jsx';

export const handleSubmit = (e) => {
    e.preventDefault();
    setTodoItems(currentTodos => [
        ...currentTodos, {
            id: crypto.randomUUID(),
            title: newItem,
            complete: false,
        }
    ]);
    setNewItem("");
}

export const handleToggleTodo = (complete, id) => {
    setTodos(currentTodos => currentTodos.map(
        item => item && item.id === id
            ? { ...item, complete }
            : item
    ));
}

export const handleTodoDel = (id) => {
    setTodos(currentTodos => currentTodos.filter(
        item => item && item.id !== id
    ));
}
