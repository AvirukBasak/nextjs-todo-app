export const handleSubmit = async (uuid, newItem, setTodoItems, setNewItem) => {
    setTodoItems(currentTodos => {
        const result = [
            ...currentTodos, {
                id: crypto.randomUUID(),
                title: newItem,
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
    setNewItem('');
}

export const handleToggleTodo = (id, isComplete, setTodoItems) => {
    setTodoItems(currentTodos => currentTodos.map(
        item => item && item.id === id
            ? { ...item, complete: isComplete }
            : item
    ));
}

export const handleTodoDel = (id, setTodoItems) => {
    setTodoItems(currentTodos => currentTodos.filter(
        item => item && item.id !== id
    ));
}
