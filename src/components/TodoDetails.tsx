import { toast } from 'react-toastify';
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
            toast.success("Updated Succesfully")
            navigate('/'); // Redirect to home or todos list page
        } catch (error) {
            console.error("Error Updating Todo", error);
            toast.error("Error Occured");
        }
    }


    // Confirm and delete the todo
    async function handleDelete(id: string) {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            try {
                await deleteTodo(id).unwrap();
                toast.success("Deleted Succesfully")
                navigate('/'); // Redirect to home or todos list page
            } catch (error) {
                console.error('Failed to delete the Todo: ', error);
                toast.error("Error Occured");
            }
        }
    }


    // Display loading and error messages if necessary
    if (isLoading) return <p className='text-gray-600 text-center'>Loading Todo...</p>;
    if (isError) return <p className='text-red-600 text-center'>Error fetching todo</p>;

    return (
        <div className='min-h-screen flex items-center justify-center bg-sky-300'>
            {/* <h1 className='text-2xl font-bold mb-6'>Todo Detail</h1> */}
            {todo && (
                <div className='bg-white p-6 shadow-md rounded-lg w-full max-w-md'>
                    <form onSubmit={handleUpdate} className='space-y-4'>
                        <div>
                            <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50'
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="completed" className='block text-sm font-medium text-gray-700'>Completed:</label>
                                <input
                                    type="checkbox"
                                    id="completed"
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                    className='mt-1'
                                />
                            </div>

                            <button
                                type="submit"
                                className='bg-sky-700 text-white rounded-lg px-4 py-2 hover:bg-sky-800 transition duration-300'>
                                {isUpdating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={() => handleDelete(todo.id)}
                        className='mt-4 bg-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-800 transition duration-300'>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoDetail;