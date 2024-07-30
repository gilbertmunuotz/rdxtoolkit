import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todos } from '../interfaces/interfaces';
import { useAddNewTodoMutation } from '../app/APISlice';

function NewProducts() {
    const navigate = useNavigate();
    const [addNewTodo, { isLoading, isError, isSuccess }] = useAddNewTodoMutation();
    const [title, setTitle] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newTodo: Todos = { id: uuidv4(), title, completed };

        try {
            await addNewTodo(newTodo).unwrap();
            setTitle('');
            setCompleted(false);
            toast.success("Created Succesfully");
            navigate('/');
        } catch (error) {
            console.error('Failed to add the todo:', error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-sky-300'>
            <div className='bg-white p-6 shadow-md rounded-lg w-full max-w-md'>
                <h1 className='text-center font-bold text-xl'>New Todo</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>

                    <div>
                        <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className='py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50'
                        />
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="completed" className='block text-sm font-medium text-gray-700'>Completed:</label>

                            <select
                                id="completed"
                                name="completed"
                                value={completed ? 'true' : 'false'}
                                onChange={(event) => setCompleted(event.target.value === 'true')}
                                required
                                className='py-1'>
                                <option value="false">Incomplete</option>
                                <option value="true">Complete</option>
                            </select>
                        </div>

                        <button type="submit" disabled={isLoading} className='bg-sky-700 text-white rounded-lg px-4 py-2 hover:bg-sky-800 transition duration-300'>
                            {isLoading ? 'Adding...' : 'Add Todo'}
                        </button>
                    </div>
                </form>
                {isSuccess && <p>Todo added successfully!</p>}
                {isError && <p>Error adding todo. Please try again.</p>}
            </div>
        </div>
    );
}

export default NewProducts;