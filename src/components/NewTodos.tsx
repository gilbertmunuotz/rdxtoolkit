import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Todos } from '../interfaces/interfaces';
import { useAddNewTodoMutation } from '../app/APISlice';
import { useNavigate } from 'react-router-dom';

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
            navigate('/');
        } catch (error) {
            console.error('Failed to add the todo:', error);
        }
    };

    return (
        <div>
            <h1>New Todo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="completed">Completed:</label>
                    <select
                        id="completed"
                        name="completed"
                        value={completed ? 'true' : 'false'}
                        onChange={(event) => setCompleted(event.target.value === 'true')}
                        required
                    >
                        <option value="false">Incomplete</option>
                        <option value="true">Complete</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Todo'}
                </button>
            </form>
            {isSuccess && <p>Todo added successfully!</p>}
            {isError && <p>Error adding todo. Please try again.</p>}
        </div>
    );
}

export default NewProducts;