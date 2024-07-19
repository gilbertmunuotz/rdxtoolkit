import Todos from './components/Todos'
import NewTodo from "./components/NewTodos";
import TodoDetail from "./components/TodoDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Todos /> },
  { path: "/newTodo", element: <NewTodo /> },
  { path: "/todos/:id", element: <TodoDetail /> }
])


function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App;