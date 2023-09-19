export const handleSubmit = (hooks, e) => {
    e.preventDefault();
    hooks.setTodoItems(currentTodos => [
        ...currentTodos, {
            id: crypto.randomUUID(),
            title: hooks.newItem,
            complete: false,
        }
    ]);
    hooks.setNewItem("");
}

export const handleToggleTodo = (hooks, complete, id) => {
    hooks.setTodoItems(currentTodos => currentTodos.map(
        item => item && item.id === id
            ? { ...item, complete }
            : item
    ));
}

export const handleTodoDel = (hooks, id) => {
    hooks.setTodoItems(currentTodos => currentTodos.filter(
        item => item && item.id !== id
    ));
}
