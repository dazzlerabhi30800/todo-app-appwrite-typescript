import { useEffect, useState } from "react";
import "./App.css";
import { databases, Collection_id, Database_id } from "./appWrite";
import InputForm from "./Components/InputForm";
import Spinner from "./Components/Spinner";

function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    const response = await databases.listDocuments(Database_id, Collection_id);
    if (!response) return;
    const documents: Todo[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      todo: doc.todo,
      todo_id: doc.todo_id,
      completed: doc.completed,
    }));
    setTimeout(() => {
      setTodos(documents);
    }, 1200);
  }
  if (!todos)
    return <Spinner />;
  return (
    <>
      <h1>Todo App using Appwrite.</h1>
      <InputForm setTodos={setTodos} todos={todos} />
      <div className="todo--wrapper">
        {todos.map((todo: any) => (
          <p className="todo" key={todo.$id}>{todo.todo}</p>
        ))}
      </div>
    </>
  );
}

export default App;
