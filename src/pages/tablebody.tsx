export default function ToDoList({todoList}) {
    
    return (
        <>
            <tbody>
            {
                todoList.map(todoRow => (
                    <tr key={todoRow.id}>
                        <td>{todoRow.id}</td>
                        <td>{todoRow.todo}</td>
                        <td>{todoRow.completed ? 'Yes' : 'No'}</td>
                        <td>{todoRow.userId}</td>
                    </tr>
                ))
            }
            </tbody>
        </>
    )
}