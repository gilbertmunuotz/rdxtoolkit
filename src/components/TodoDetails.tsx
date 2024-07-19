import { useState, useEffect } from 'react';
import { RouteParams } from '../interfaces/interfaces';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTodoByIdQuery, useDeleteTodoMutation, useUpdateTodoMutation } from '../app/APISlice';

function TodoDetail() {

    // Initialize Hooks
    const { id } = useParams<RouteParams>();
    const { data: todo, isLoading, isError } = useGetTodoByIdQuery(id!);
    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const navigate = useNavigate();

    // Manage state for form inputs 
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    // Populate form state with the fetched todo data on initial render
    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setCompleted(todo.completed);
        }
    }, [todo]);


    // Handle form submission to update the todo
    async function handleUpdate(event: React.FormEvent) {
        event.preventDefault();

        try {
            await updateTodo({
                id: id!, // Assertion that id is a string
                title,
                completed,
            }).unwrap();
            console.log(`Todo with id ${id} updated successfully.`);
            navigate('/'); // Redirect to home or todos list page
        } catch (error) {
            console.error("Error Updating Todo", error);
        }
    }


    // Confirm and delete the todo
    async function handleDelete(id: string) {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await deleteTodo(id).unwrap();
                console.log(`Todo with id ${id} deleted successfully.`);
                navigate('/'); // Redirect to home or todos list page
            } catch (error) {
                console.error('Failed to delete the Todo: ', error);
            }
        }
    }


    // Display loading and error messages if necessary
    if (isLoading) return <p>Loading Todo...</p>;
    if (isError) return <p>Error fetching todo</p>;

    return (
        <div>
            <h1>Todo Detail</h1>
            {todo && (
                <div>
                    <form onSubmit={handleUpdate}>
                        
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="completed">Completed:</label>
                            <input
                                type="checkbox"
                                id="completed"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                        </div>

                        <button type="submit" className='bg-sky-700 rounded-lg mx-3 px-3'>
                            {isUpdating ? 'Updating...' : 'Update'}
                        </button>

                    </form>

                    <button onClick={() => handleDelete(todo.id)} className='bg-red-700 rounded-lg mx-3 px-3'>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                </div>
            )}
        </div>
    );
}

export default TodoDetail;