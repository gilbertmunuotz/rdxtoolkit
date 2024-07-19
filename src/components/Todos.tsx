import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Todos } from '../interfaces/interfaces';
import { useGetTodosQuery } from '../app/APISlice';

function Todoss() {
    const { data, isLoading, isError } = useGetTodosQuery();
    const [todos, setTodos] = useState<Todos[]>([]);

    useEffect(() => {
        if (data) {
            setTodos(data);
        }
    }, [data]);

    return (
        <div className="TodosList">
            {isLoading ? (
                <p>Loading Todos...</p>
            ) : isError ? (
                <p>Error fetching todos</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <Link to={`/todos/${todo.id}`} className='flex  space-x-5'>
                                <h2>{todo.id}</h2>
                                <h1>{todo.title}</h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Todoss;