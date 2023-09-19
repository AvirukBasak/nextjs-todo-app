export const handleSubmit = async (hooks, uuid) => {
    hooks.setTodoItems(currentTodos => {
        const result = [
            ...currentTodos, {
                id: uuid,
                title: hooks.newItem,
                complete: false,
            }
        ];
        fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'UPDATE',
                uuid: uuid,
                timestamp: (new Date()).toLocaleString(),
                todoList: result,
            })
        }).catch(e => {
            console.error(e);
            throw e;
        });
        return result;
    });
    hooks.setNewItem('');
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
