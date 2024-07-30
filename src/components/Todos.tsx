import { Link } from 'react-router-dom';
import { MdAddBox } from "react-icons/md";
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
        <div className="min-h-screen flex items-center justify-center bg-sky-300">
            {isLoading ? (
                <p className="text-gray-600">Loading Todos...</p>
            ) : isError ? (
                <p className="text-red-600">Error fetching todos</p>
            ) : (
                <ul className="space-y-4">
                    <div className="flex justify-between">
                        <h6 className='text-xl font-bold'>Data Set</h6>
                        <Link to={"/newTodo"}>
                            <button type="button"><MdAddBox size={25} /></button>
                        </Link>
                    </div>
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="bg-white p-4 shadow-md rounded-lg">
                            <ul>{ }</ul>
                            <Link to={`/todos/${todo.id}`} className="flex items-center space-x-5 text-blue-600 hover:text-blue-800">
                                <span className='font-semibold'> {index + 1}.</span>
                                <h1 className="text-xl font-bold">{todo.title}</h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Todoss;