export const handleSubmit = async (hooks) => {
    const uuid = crypto.randomUUID();
    try {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Conten-Type': 'application/json' },
            body: {
                method: 'UPDATE',
                uuid: uuid,
                title: hooks.newItem,
                complete: false,
            }
        });
        hooks.setApiCallState(res);
    } catch (e) {
        console.error(e);
        alert(e);
    }
    hooks.setTodoItems(currentTodos => [
        ...currentTodos, {
            id: uuid,
            title: hooks.newItem,
            complete: false,
        }
    ]);
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

